"""Run with Python + Playwright installed; uses installed Edge, no browser download."""
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

def read_data(filename, prefix):
    return json.loads((ROOT / filename).read_text(encoding="utf-8").removeprefix(prefix).strip().removesuffix(";"))

characters = read_data("data.js", "window.CHARACTERS = ")
houses = read_data("houses.js", "window.HOUSES = ")
ids = {c["id"] for c in characters}
assert len(ids) == len(characters)
for c in characters:
    for field in ["name", "actor", "faction", "storyline", "location", "wants",
                  "allies", "enemies", "currentStatus", "remember", "image", "family"]:
        assert c[field], (c["id"], field)
    assert c["image"] == f"images/characters/{c['id']}.jpg"
for h in houses.values():
    people = {p["id"] for p in h["people"]}
    assert "ramsay-snow" not in people
    for p in h["people"]:
        assert not p["characterId"] or p["characterId"] in ids
    for r in h["relationships"]:
        assert set(r["from"] + r["to"]) <= people
for filename in ["data.js", "houses.js", "index.html", "app.js", "styles.css", "README.md"]:
    assert not re.search(r"season.?2|s2e10|valar morghulis", (ROOT / filename).read_text(encoding="utf-8"), re.I), filename

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    for width, height in [(390, 844), (320, 740), (1280, 900)]:
        page = browser.new_page(viewport={"width": width, "height": height}, has_touch=width < 500)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(ROOT.as_uri() + "/index.html")
        assert page.locator(".character-card").count() == len(characters)
        for query, expected in [("Blackfish", "brynden-tully"), ("Riverrun", "edmure-tully"),
                                ("Tully", "catelyn-stark"), ("Iwan Rheon", "ramsay-snow"),
                                ("Theon's rescuer", "ramsay-snow")]:
            page.locator("#search").fill(query)
            name = next(c["name"] for c in characters if c["id"] == expected)
            page.locator(".character-card").filter(has=page.get_by_text(name, exact=True)).click()
            assert page.locator("#profileName").inner_text() == name
            page.locator("#closeDialog").click()
            assert not page.locator("dialog").is_visible()
        page.locator("#search").fill("no such character xyz")
        assert page.locator(".character-card").count() == 0
        assert "No characters" in page.locator("#searchResults").inner_text()
        page.locator("#search").fill("")
        for button in page.locator(".filter-btn").all():
            button.click()
            assert page.locator(".character-card").count() > 0
        page.get_by_role("button", name="All", exact=True).click()
        page.get_by_role("button", name="Houses", exact=True).click()
        assert page.locator(".house-btn").count() == 8
        assert not page.locator("#houseTree").is_visible()
        for name in houses:
            page.locator(f'[data-house="{name}"]').click()
            assert page.locator("#houseHeading").inner_text() == "House " + name
            assert page.locator(".family-branch").count() == len(houses[name]["relationships"])
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (width, name)
            page.locator(".tree-scroll").evaluate("el => el.scrollLeft = 200")
            if width < 500 and name == "Tully":
                assert page.locator(".tree-scroll").evaluate("el => el.scrollLeft") > 0
            tree_nodes = page.locator(".full-tree [data-character-id]")
            if tree_nodes.count():
                tree_nodes.first.click()
                assert page.locator("dialog").is_visible()
                page.locator("#closeDialog").click()
            for node in page.locator(".key-members [data-character-id]").all():
                node.click()
                assert page.locator("dialog").is_visible()
                page.keyboard.press("Escape")
                assert not page.locator("dialog").is_visible()
            if name == "Tully" and width == 390:
                page.screenshot(path=str(ROOT.parent / "tully-mobile.png"), full_page=True)
            page.get_by_role("button", name="All Houses", exact=False).click()
        page.get_by_role("button", name="Maps", exact=True).click()
        assert "World_Of_Ice_And_Fire.jpg" in page.locator("#worldMap").get_attribute("src")
        assert page.locator("#mapsView svg").count() == 0
        page.get_by_role("button", name="Zoom in", exact=True).click()
        assert page.locator("#mapZoomLabel").inner_text() == "150%"
        page.get_by_role("button", name="Fit map", exact=True).click()
        assert page.locator("#mapZoomLabel").inner_text() == "100%"
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.get_by_role("button", name="Characters", exact=True).click()
        page.locator("#search").fill("Ramsay")
        page.locator(".character-card .placeholder").wait_for()
        page.locator(".character-card").click()
        page.locator(".profile-placeholder").wait_for()
        assert page.evaluate("document.querySelector('dialog').scrollWidth <= document.querySelector('dialog').clientWidth")
        page.mouse.click(1, 1)
        assert not page.locator("dialog").is_visible()
        page.goto(ROOT.as_uri() + "/index.html#brynden-tully")
        assert "Brynden" in page.locator("#profileName").inner_text()
        page.keyboard.press("Escape")
        assert page.evaluate("location.hash") == ""
        assert not errors, errors
        print(f"PASS {width}x{height}: tabs, all house pages/nodes, search, filters, fallbacks, dialogs, overflow")
        page.close()
    browser.close()
print(f"PASS data integrity: {len(characters)} characters, {len(houses)} houses")
