window.HOUSES = {
  "Stark": {
    "seat": "Winterfell (ruined)",
    "region": "The North",
    "leader": "Robb Stark",
    "allegiance": "Independent Northern and Riverlands kingdom",
    "description": "The scattered Stark family is fighting a war while its children struggle to survive.",
    "people": [
      {
        "id": "ned-stark",
        "name": "Ned Stark",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "catelyn-stark",
        "name": "Catelyn Stark",
        "characterId": "catelyn-stark",
        "note": ""
      },
      {
        "id": "robb-stark",
        "name": "Robb Stark",
        "characterId": "robb-stark",
        "note": ""
      },
      {
        "id": "sansa-stark",
        "name": "Sansa Stark",
        "characterId": "sansa-stark",
        "note": ""
      },
      {
        "id": "arya-stark",
        "name": "Arya Stark",
        "characterId": "arya-stark",
        "note": ""
      },
      {
        "id": "bran-stark",
        "name": "Bran Stark",
        "characterId": "bran-stark",
        "note": ""
      },
      {
        "id": "rickon-stark",
        "name": "Rickon Stark",
        "characterId": null,
        "note": ""
      },
      {
        "id": "jon-snow",
        "name": "Jon Snow",
        "characterId": "jon-snow",
        "note": "Ned's acknowledged bastard; mother unknown"
      }
    ],
    "relationships": [
      {
        "type": "marriage",
        "from": [
          "ned-stark"
        ],
        "to": [
          "catelyn-stark"
        ],
        "label": "Marriage"
      },
      {
        "type": "parentChild",
        "from": [
          "ned-stark",
          "catelyn-stark"
        ],
        "to": [
          "robb-stark",
          "sansa-stark",
          "arya-stark",
          "bran-stark",
          "rickon-stark"
        ],
        "label": "Their children"
      },
      {
        "type": "public",
        "from": [
          "ned-stark"
        ],
        "to": [
          "jon-snow"
        ],
        "label": "Acknowledged father → son; mother unknown"
      }
    ]
  },
  "Lannister": {
    "seat": "Casterly Rock",
    "region": "Westerlands",
    "leader": "Tywin Lannister",
    "allegiance": "Joffrey's Crown; allied with House Tyrell",
    "description": "The family holds the capital and much of the power behind Joffrey's throne.",
    "people": [
      {
        "id": "tywin-lannister",
        "name": "Tywin Lannister",
        "characterId": "tywin-lannister",
        "note": ""
      },
      {
        "id": "jaime-lannister",
        "name": "Jaime Lannister",
        "characterId": "jaime-lannister",
        "note": ""
      },
      {
        "id": "cersei-lannister",
        "name": "Cersei Lannister",
        "characterId": "cersei-lannister",
        "note": ""
      },
      {
        "id": "tyrion-lannister",
        "name": "Tyrion Lannister",
        "characterId": "tyrion-lannister",
        "note": ""
      },
      {
        "id": "robert-baratheon",
        "name": "Robert Baratheon",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "joffrey-baratheon",
        "name": "Joffrey Baratheon",
        "characterId": "joffrey-baratheon",
        "note": ""
      },
      {
        "id": "myrcella-baratheon",
        "name": "Myrcella Baratheon",
        "characterId": null,
        "note": "Sent to Dorne"
      },
      {
        "id": "tommen-baratheon",
        "name": "Tommen Baratheon",
        "characterId": null,
        "note": ""
      }
    ],
    "relationships": [
      {
        "type": "parentChild",
        "from": [
          "tywin-lannister"
        ],
        "to": [
          "jaime-lannister",
          "cersei-lannister",
          "tyrion-lannister"
        ],
        "label": "Father → children"
      },
      {
        "type": "siblings",
        "from": [
          "jaime-lannister"
        ],
        "to": [
          "cersei-lannister"
        ],
        "label": "Twins"
      },
      {
        "type": "partnership",
        "from": [
          "jaime-lannister"
        ],
        "to": [
          "cersei-lannister"
        ],
        "label": "Secret lovers"
      },
      {
        "type": "parentChild",
        "from": [
          "jaime-lannister",
          "cersei-lannister"
        ],
        "to": [
          "joffrey-baratheon",
          "myrcella-baratheon",
          "tommen-baratheon"
        ],
        "label": "Biological parents → children"
      },
      {
        "type": "marriage",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "cersei-lannister"
        ],
        "label": "Marriage; Robert is deceased"
      },
      {
        "type": "public",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "joffrey-baratheon",
          "myrcella-baratheon",
          "tommen-baratheon"
        ],
        "label": "Publicly claimed father → children; not biological"
      }
    ]
  },
  "Baratheon": {
    "seat": "Storm's End; Stannis holds Dragonstone",
    "region": "Stormlands / Crown",
    "leader": "Disputed: Joffrey holds the throne; Stannis claims it",
    "allegiance": "Divided by the royal succession",
    "description": "Robert's death split the realm between competing claims to his crown.",
    "people": [
      {
        "id": "robert-baratheon",
        "name": "Robert Baratheon",
        "characterId": null,
        "note": "Late king"
      },
      {
        "id": "stannis-baratheon",
        "name": "Stannis Baratheon",
        "characterId": "stannis-baratheon",
        "note": ""
      },
      {
        "id": "renly-baratheon",
        "name": "Renly Baratheon",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "gendry",
        "name": "Gendry",
        "characterId": "gendry",
        "note": ""
      },
      {
        "id": "joffrey-baratheon",
        "name": "Joffrey Baratheon",
        "characterId": "joffrey-baratheon",
        "note": ""
      },
      {
        "id": "myrcella-baratheon",
        "name": "Myrcella Baratheon",
        "characterId": null,
        "note": ""
      },
      {
        "id": "tommen-baratheon",
        "name": "Tommen Baratheon",
        "characterId": null,
        "note": ""
      }
    ],
    "relationships": [
      {
        "type": "siblings",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "stannis-baratheon",
          "renly-baratheon"
        ],
        "label": "Brothers; Stannis is older than Renly"
      },
      {
        "type": "parentChild",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "gendry"
        ],
        "label": "Biological father → unacknowledged son"
      },
      {
        "type": "public",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "joffrey-baratheon",
          "myrcella-baratheon",
          "tommen-baratheon"
        ],
        "label": "Publicly claimed children; biological father is Jaime"
      },
      {
        "type": "context",
        "from": [
          "robert-baratheon"
        ],
        "to": [
          "stannis-baratheon"
        ],
        "label": "Stannis claims succession because Cersei's children are not Robert's"
      }
    ]
  },
  "Tyrell": {
    "seat": "Highgarden",
    "region": "The Reach",
    "leader": "Mace Tyrell; Olenna is an influential elder",
    "allegiance": "Allied with Joffrey and House Lannister",
    "description": "Margaery's betrothal gives this wealthy family a central place at court.",
    "people": [
      {
        "id": "olenna-tyrell",
        "name": "Olenna Tyrell",
        "characterId": "olenna-tyrell",
        "note": ""
      },
      {
        "id": "mace-tyrell",
        "name": "Mace Tyrell",
        "characterId": null,
        "note": "Lord of Highgarden"
      },
      {
        "id": "margaery-tyrell",
        "name": "Margaery Tyrell",
        "characterId": "margaery-tyrell",
        "note": ""
      },
      {
        "id": "loras-tyrell",
        "name": "Loras Tyrell",
        "characterId": "loras-tyrell",
        "note": ""
      },
      {
        "id": "renly-baratheon",
        "name": "Renly Baratheon",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "joffrey-baratheon",
        "name": "Joffrey Baratheon",
        "characterId": "joffrey-baratheon",
        "note": ""
      }
    ],
    "relationships": [
      {
        "type": "parentChild",
        "from": [
          "olenna-tyrell"
        ],
        "to": [
          "mace-tyrell"
        ],
        "label": "Mother → son"
      },
      {
        "type": "parentChild",
        "from": [
          "mace-tyrell"
        ],
        "to": [
          "margaery-tyrell",
          "loras-tyrell"
        ],
        "label": "Father → children; Olenna's grandchildren"
      },
      {
        "type": "marriage",
        "from": [
          "margaery-tyrell"
        ],
        "to": [
          "renly-baratheon"
        ],
        "label": "Late husband"
      },
      {
        "type": "partnership",
        "from": [
          "loras-tyrell"
        ],
        "to": [
          "renly-baratheon"
        ],
        "label": "Lovers before Renly's death"
      },
      {
        "type": "context",
        "from": [
          "margaery-tyrell"
        ],
        "to": [
          "joffrey-baratheon"
        ],
        "label": "Betrothed"
      }
    ]
  },
  "Tully": {
    "seat": "Riverrun",
    "region": "Riverlands",
    "leader": "Edmure Tully, following Hoster's death",
    "allegiance": "King Robb Stark / Northern–Riverlands coalition",
    "description": "Catelyn's birth family anchors Robb's alliance with the Riverlands.",
    "people": [
      {
        "id": "hoster-tully",
        "name": "Hoster Tully",
        "characterId": null,
        "note": "His funeral is held at Riverrun"
      },
      {
        "id": "brynden-tully",
        "name": "Brynden \"Blackfish\" Tully",
        "characterId": "brynden-tully",
        "note": ""
      },
      {
        "id": "edmure-tully",
        "name": "Edmure Tully",
        "characterId": "edmure-tully",
        "note": ""
      },
      {
        "id": "ned-stark",
        "name": "Ned Stark",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "catelyn-stark",
        "name": "Catelyn Stark",
        "characterId": "catelyn-stark",
        "note": ""
      },
      {
        "id": "robb-stark",
        "name": "Robb Stark",
        "characterId": "robb-stark",
        "note": ""
      },
      {
        "id": "sansa-stark",
        "name": "Sansa Stark",
        "characterId": "sansa-stark",
        "note": ""
      },
      {
        "id": "arya-stark",
        "name": "Arya Stark",
        "characterId": "arya-stark",
        "note": ""
      },
      {
        "id": "bran-stark",
        "name": "Bran Stark",
        "characterId": "bran-stark",
        "note": ""
      },
      {
        "id": "rickon-stark",
        "name": "Rickon Stark",
        "characterId": null,
        "note": ""
      },
      {
        "id": "lysa-arryn",
        "name": "Lysa Tully Arryn",
        "characterId": null,
        "note": ""
      },
      {
        "id": "jon-arryn",
        "name": "Jon Arryn",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "robin-arryn",
        "name": "Robin Arryn",
        "characterId": null,
        "note": ""
      }
    ],
    "relationships": [
      {
        "type": "siblings",
        "from": [
          "hoster-tully"
        ],
        "to": [
          "brynden-tully"
        ],
        "label": "Brothers; Brynden is younger"
      },
      {
        "type": "parentChild",
        "from": [
          "hoster-tully"
        ],
        "to": [
          "catelyn-stark",
          "lysa-arryn",
          "edmure-tully"
        ],
        "label": "Father → children; Brynden's nieces and nephew"
      },
      {
        "type": "marriage",
        "from": [
          "catelyn-stark"
        ],
        "to": [
          "ned-stark"
        ],
        "label": "Marriage; Ned is deceased"
      },
      {
        "type": "parentChild",
        "from": [
          "catelyn-stark",
          "ned-stark"
        ],
        "to": [
          "robb-stark",
          "sansa-stark",
          "arya-stark",
          "bran-stark",
          "rickon-stark"
        ],
        "label": "Their children; Edmure's nieces and nephews"
      },
      {
        "type": "marriage",
        "from": [
          "lysa-arryn"
        ],
        "to": [
          "jon-arryn"
        ],
        "label": "Marriage; Jon is deceased"
      },
      {
        "type": "parentChild",
        "from": [
          "lysa-arryn",
          "jon-arryn"
        ],
        "to": [
          "robin-arryn"
        ],
        "label": "Parents → son"
      }
    ]
  },
  "Greyjoy": {
    "seat": "Pyke",
    "region": "Iron Islands",
    "leader": "Balon Greyjoy",
    "allegiance": "Ironborn independence; at war with the North",
    "description": "Balon's invasion and Theon's divided family ties have helped tear the North apart.",
    "people": [
      {
        "id": "balon-greyjoy",
        "name": "Balon Greyjoy",
        "characterId": "balon-greyjoy",
        "note": ""
      },
      {
        "id": "yara-greyjoy",
        "name": "Yara Greyjoy",
        "characterId": "yara-greyjoy",
        "note": ""
      },
      {
        "id": "theon-greyjoy",
        "name": "Theon Greyjoy",
        "characterId": "theon-greyjoy",
        "note": ""
      },
      {
        "id": "ned-stark",
        "name": "Ned Stark",
        "characterId": null,
        "note": "Deceased"
      }
    ],
    "relationships": [
      {
        "type": "parentChild",
        "from": [
          "balon-greyjoy"
        ],
        "to": [
          "yara-greyjoy",
          "theon-greyjoy"
        ],
        "label": "Father → children"
      },
      {
        "type": "context",
        "from": [
          "ned-stark"
        ],
        "to": [
          "theon-greyjoy"
        ],
        "label": "Ward / hostage raised in the Stark household; not biological"
      }
    ]
  },
  "Arryn": {
    "members": ["Lysa Arryn", "Robin Arryn"],
    "seat": "The Eyrie",
    "region": "The Vale",
    "leader": "Robin Arryn; Lysa rules for her young son",
    "allegiance": "The Vale stays out of the war",
    "description": "Jon Arryn's death brought Ned south; his widow Lysa is Catelyn's sister.",
    "people": [
      {
        "id": "hoster-tully",
        "name": "Hoster Tully",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "lysa-arryn",
        "name": "Lysa Tully Arryn",
        "characterId": null,
        "note": ""
      },
      {
        "id": "catelyn-stark",
        "name": "Catelyn Stark",
        "characterId": "catelyn-stark",
        "note": ""
      },
      {
        "id": "jon-arryn",
        "name": "Jon Arryn",
        "characterId": null,
        "note": "Late lord and Hand"
      },
      {
        "id": "robin-arryn",
        "name": "Robin Arryn",
        "characterId": null,
        "note": ""
      }
    ],
    "relationships": [
      {
        "type": "parentChild",
        "from": [
          "hoster-tully"
        ],
        "to": [
          "lysa-arryn",
          "catelyn-stark"
        ],
        "label": "Father → daughters; Tully connection"
      },
      {
        "type": "marriage",
        "from": [
          "jon-arryn"
        ],
        "to": [
          "lysa-arryn"
        ],
        "label": "Marriage; Jon is deceased"
      },
      {
        "type": "parentChild",
        "from": [
          "jon-arryn",
          "lysa-arryn"
        ],
        "to": [
          "robin-arryn"
        ],
        "label": "Parents → son"
      }
    ]
  },
  "Targaryen": {
    "seat": "No current seat; Daenerys is in Astapor",
    "region": "Exiled dynasty",
    "leader": "Daenerys Targaryen",
    "allegiance": "Daenerys's claim to the Iron Throne",
    "description": "The deposed royal family's surviving claimant has dragons and is seeking an army.",
    "people": [
      {
        "id": "aerys-targaryen",
        "name": "Aerys II Targaryen",
        "characterId": null,
        "note": "The Mad King; deceased"
      },
      {
        "id": "rhaegar-targaryen",
        "name": "Rhaegar Targaryen",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "viserys-targaryen",
        "name": "Viserys Targaryen",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "daenerys-targaryen",
        "name": "Daenerys Targaryen",
        "characterId": "daenerys-targaryen",
        "note": ""
      },
      {
        "id": "khal-drogo",
        "name": "Khal Drogo",
        "characterId": null,
        "note": "Deceased"
      },
      {
        "id": "rhaego",
        "name": "Rhaego",
        "characterId": null,
        "note": "Died before birth"
      }
    ],
    "relationships": [
      {
        "type": "parentChild",
        "from": [
          "aerys-targaryen"
        ],
        "to": [
          "rhaegar-targaryen",
          "viserys-targaryen",
          "daenerys-targaryen"
        ],
        "label": "Father → children"
      },
      {
        "type": "marriage",
        "from": [
          "daenerys-targaryen"
        ],
        "to": [
          "khal-drogo"
        ],
        "label": "Marriage; Drogo is deceased"
      },
      {
        "type": "parentChild",
        "from": [
          "daenerys-targaryen",
          "khal-drogo"
        ],
        "to": [
          "rhaego"
        ],
        "label": "Parents → son"
      }
    ]
  }
};
