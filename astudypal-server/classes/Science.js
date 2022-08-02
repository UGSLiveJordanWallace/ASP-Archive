class ChemistryScience {
    constructor(data) {
        this.data = data;
        this.elements = {
            H: {
              atomicNumber: 1,
              name: "Hydrogen",
              symbol: "H",
              atomicMass: 1.008,
              radioactive: false,
              category: "Non-metal"
            },
            He: {
              atomicNumber: 2,
              name: "Helium",
              symbol: "He",
              atomicMass: 4.0026,
              radioactive: false,
              category: "Noble Gas"
            },
            Li: {
              atomicNumber: 3,
              name: "Lithium",
              symbol: "Li",
              atomicMass: 6.94,
              radioactive: false,
              category: "Alkali Metal"
            },
            Be: {
              atomicNumber: 4,  
              name: "Berylium",
              symbol: "Be",
              atomicMass: 9.012,
              radioactive: false,
              category: "Alkaline Earth Metal"
            },
            B: {
              atomicNumber: 5,  
              name: "Boron",
              symbol: "B",
              atomicMass: 10.81,
              radioactive: false,
              category: "Metalloid"
            },
            C: {
              atomicNumber: 6,  
              name: "Carbon",
              symbol: "C",
              atomicMass: 12.011,
              radioactive: false,
              category: "Non-metal"
            },
            N: {
              atomicNumber: 7,  
              name: "Nitrogen",
              symbol: "N",
              atomicMass: 14.007,
              radioactive: false,
              category: "Non-metal"
            },
            O: {
              atomicNumber: 8,  
              name: "Oxygen",
              symbol: "O",
              atomicMass: 15.999,
              radioactive: false,
              category: "Non-metal"
            },
            F: {
              atomicNumber: 9, 
              name: "Flourine",
              symbol: "F",
              atomicMass: 18.99840,
              radioactive: false,
              category: "Halogen"
            },
            Ne: {
              atomicNumber: 10,  
              name: "Neon",
              symbol: "Ne",
              atomicMass: 20.17976,
              radioactive: false,
              category: "Noble Gas"
            },
            Na: {
              atomicNumber: 11,
              name: "Sodium",
              symbol: "Na",
              atomicMass: 22.98976,
              radioactive: false,
              category: "Alkali Metal"
            },
            Mg: {
              atomicNumber: 12,  
              name: "Magnesium",
              symbol: "Mg",
              atomicMass: 24.305,
              radioactive: false,
              category: "Alkaline Earth Metal"
            },
            Al: {
              atomicNumber: 13,  
              name: "Aluminium",
              symbol: "Al",
              atomicMass: 26.98153,
              radioactive: false,
              category: "Basic Metal"
            },
            Si: {
              atomicNumber: 14,
              name: "Silicon",
              symbol: "Si",
              atomicMass: 28.085,
              radioactive: false,
              category: "Metalloid"
            },
            P: {
              atomicNumber: 15,  
              name: "Phosphorous",
              symbol: "P",
              atomicMass: 30.97376,
              radioactive: false,
              category: "Non-metal"
            },
            S: {
              atomicNumber: 16,  
              name: "Sulfur",
              symbol: "S",
              atomicMass: 32.06,
              radioactive: false,
              category: "Non-metal"
            },
            Cl: {
              atomicNumber: 17,  
              name: "Chlorine",
              symbol: "Cl",
              atomicMass: 35.45,
              radioactive: false,
              category: "Halogen"
            },
            Ar: {
              atomicNumber: 18,
              name: "Argon",
              symbol: "Ar",
              atomicMass: 39.948,
              radioactive: false,
              category: "Noble Gas"
            },
            K: {
              atomicNumber: 19,
              name: "Potassium",
              symbol: "K",
              atomicMass: 39.0983,
              radioactive: false,
              category: "Alkali Metal"
            },
            Ca: {
              atomicNumber: 20,
              name: "Calcium",
              symbol: "Ca",
              atomicMass: 40.078,
              radioactive: false,
              category: "Alkaline Earth Metal"
            },
            Sc: {
              atomicNumber: 21,
              name: "Scandium",
              symbol: "Sc",
              atomicMass: 44.955908,
              radioactive: false,
              category: "Transition Metal"
            },
            Ti: {
              atomicNumber: 22,
              name: "Titanium",
              symbol: "Ti",
              atomicMass: 47.867,
              radioactive: false,
              category: "Transition Metal"
            },
            V: {
              atomicNumber: 23,
              name: "Vanadium",
              symbol: "V",
              atomicMass: 50.9415,
              radioactive: false,
              category: "Transition Metal"
            },
            Cr: {
              atomicNumber: 24,
              name: "Chromium",
              symbol: "Cr",
              atomicMass: 51.9961,
              radioactive: false,
              category: "Transition Metal"
            },
            Mn: {
              atomicNumber: 25,
              name: "Manganese",
              symbol: "Mn",
              atomicMass: 54.938044,
              radioactive: false,
              category: "Transition Metal"
            },
            Fe: {
              atomicNumber: 26,
              name: "Iron",
              symbol: "Fe",
              atomicMass: 58.845,
              radioactive: false,
              category: "Transition Metal"
            },
            Co: {
              atomicNumber: 27,
              name: "Cobalt",
              symbol: "Co",
              atomicMass: 58.933,
              radioactive: false,
              category: "Transition Metal"
            },
            Ni: {
              atomicNumber: 28,
              name: "Nickel",
              symbol: "Ni",
              atomicMass: 58.693,
              radioactive: false,
              category: "Transition Metal"
            },
            Cu: {
              atomicNumber: 29,
              name: "Copper",
              symbol: "Cu",
              atomicMass: 63.546,
              radioactive: false,
              category: "Transition Metal"
            },
            Zn: {
              atomicNumber: 30,
              name: "Zinc",
              symbol: "Zn",
              atomicMass: 65.38,
              radioactive: false,
              category: "Transition Metal"
            },
            Ga: {
              atomicNumber: 31,
              name: "Gallium",
              symbol: "Ga",
              atomicMass: 69.723,
              radioactive: false,
              category: "Basic Metal"
            },
            Ge: {
              atomicNumber: 32,
              name: "Germanium",
              symbol: "Ge",
              atomicMass: 72.630,
              radioactive: false,
              category: "Metalloid"
            },
            As: {
              atomicNumber: 33,
              name: "Arsenic",
              symbol: "As",
              atomicMass: 74.922,
              radioactive: false,
              category: "Metalloid"
            },
            Se: {
              atomicNumber: 34,
              name: "Selenium",
              symbol: "Se",
              atomicMass: 778.971,
              radioactive: false,
              category: "Non-metal"
            },
            Br: {
              atomicNumber: 35,
              name: "Bromine",
              symbol: "Br",
              atomicMass: 79.904,
              radioactive: false,
              category: "Halogen"
            },
            Kr: {
              atomicNumber: 36,
              name: "Krypton",
              symbol: "Kr",
              atomicMass: 83.798,
              radioactive: false,
              category: "Noble Gas"
            },
            Rb: {
              atomicNumber: 37,
              name: "Rubidium",
              symbol: "Rb",
              atomicMass: 85.4678,
              radioactive: false,
              category: "Alkali Metal"
            },
            Sr: {
              atomicNumber: 38,
              name: "Strontium",
              symbol: "Sr",
              atomicMass: 87.62,
              radioactive: false,
              category: "Alkaline Earth Metal"
            },
            Y: {
              atomicNumber: 39,
              name: "Yttrium",
              symbol: "Y",
              atomicMass: 88.90584,
              radioactive: false,
              category: "Transition Metal"
            },
            Zr: {
              atomicNumber: 40,
              name: "Zirconium",
              symbol: "Zr",
              atomicMass: 91.224,
              radioactive: false,
              category: "Transition Metal"
            },
            Nb: {
              atomicNumber: 41,
              name: "Niobium",
              symbol: "Nb",
              atomicMass: 92.90637,
              radioactive: false,
              category: "Transition Metal"
            },
            Mo: {
              atomicNumber: 42,
              name: "Molybdenum",
              symbol: "Mo",
              atomicMass: 95.95,
              radioactive: false,
              category: "Transition Metal"
            },
            Tc: {
              atomicNumber: 43,
              name: "Technetium",
              symbol: "Tc",
              atomicMass: 98,
              radioactive: true,
              category: "Transition Metal"
            },
            Ru: {
              atomicNumber: 44,
              name: "Ruthenium",
              symbol: "Ru",
              atomicMass: 101.07,
              radioactive: false,
              category: "Transition Metal"
            },
            Rh: {
              atomicNumber: 45,
              name: "Rhodium",
              symbol: "Rh",
              atomicMass: 102.91,
              radioactive: false,
              category: "Transition Metal"
            },
            Pd: {
              atomicNumber: 46,
              name: "Palladium",
              symbol: "Pd",
              atomicMass: 106.42,
              radioactive: false,
              category: "Transition Metal"
            },
            Ag: {
              atomicNumber: 47,
              name: "Silver",
              symbol: "Ag",
              atomicMass: 107.87,
              radioactive: false,
              category: "Transition Metal"
            },
            Cd: {
              atomicNumber: 48,
              name: "Cadmium",
              symbol: "Cd",
              atomicMass: 112.41,
              radioactive: false,
              category: "Transition Metal"
            },
            In: {
              atomicNumber: 49,
              name: "Indium",
              symbol: "In",
              atomicMass: 114.82,
              radioactive: false,
              category: "Basic Metal"
            },
            Sn: {
              atomicNumber: 50,
              name: "Tin",
              symbol: "Sn",
              atomicMass: 118.71,
              radioactive: false,
              category: "Basic Metal"
            },
            Sb: {
              atomicNumber: 51,
              name: "Antimony",
              symbol: "Sb",
              atomicMass: 121.76,
              radioactive: false,
              category: "Metalloid"
            },
            Te: {
              atomicNumber: 52,
              name: "Tellurium",
              symbol: "Te",
              atomicMass: 127.60,
              radioactive: false,
              category: "Metalloid"
            },
            I: {
              atomicNumber: 53,
              name: "Iodine",
              symbol: "I",
              atomicMass: 126.90,
              radioactive: false,
              category: "Halogen"
            },
            Xe: {
              atomicNumber: 54,
              name: "Xenon",
              symbol: "Xe",
              atomicMass: 131.29,
              radioactive: false,
              category: "Noble Gas"
            },
            Cs: {
              atomicNumber: 55,
              name: "Cesium",
              symbol: "Cs",
              atomicMass: 132.90545196,
              radioactive: false,
              category: "Alkali Metal"
            },
            Ba: {
              atomicNumber: 56,
              name: "Barium",
              symbol: "Ba",
              atomicMass: 137.327,
              radioactive: false,
              category: "Alkaline Earth Metal"
            },
            La: {
              atomicNumber: 57,
              name: "Lanthanum",
              symbol: "La",
              atomicMass: 138.91,
              radioactive: false,
              category: "Lanthanoid"
            },
            Ce: {
              atomicNumber: 58,
              name: "Cerium",
              symbol: "Ce",
              atomicMass: 140.12,
              radioactive: false,
              category: "Lanthanoid"
            },
            Pr: {
              atomicNumber: 59,
              name: "Praseodymium",
              symbol: "Pr",
              atomicMass: 140.91,
              radioactive: false,
              category: "Lanthanoid"
            },
            Nd: {
              atomicNumber: 60,
              name: "Neodymium",
              symbol: "Nd",
              atomicMass: 144.24,
              radioactive: false,
              category: "Lanthanoid"
            },
            Pm: {
              atomicNumber: 61,
              name: "Promethium",
              symbol: "Pm",
              atomicMass: 145,
              radioactive: true,
              category: "Lanthanoid"
            },
            Sm: {
              atomicNumber: 62,
              name: "Samarium",
              symbol: "Sm",
              atomicMass: 150.36,
              radioactive: false,
              category: "Lanthanoid"
            },
            Eu: {
              atomicNumber: 63,
              name: "Europium",
              symbol: "Eu",
              atomicMass: 151.96,
              radioactive: false,
              category: "Lanthanoid"
            },
            Gd: {
              atomicNumber: 64,
              name: "Gadolinium",
              symbol: "Gd",
              atomicMass: 157.25,
              radioactive: false,
              category: "Lanthanoid"
            },
            Tb: {
              atomicNumber: 65,
              name: "Terbium",
              symbol: "Tb",
              atomicMass: 158.93,
              radioactive: false,
              category: "Lanthanoid"
            },
            Dy: {
              atomicNumber: 66,
              name: "Dysprosium",
              symbol: "Dy",
              atomicMass: 162.50,
              radioactive: false,
              category: "Lanthanoid"
            },
            Ho: {
              atomicNumber: 67,
              name: "Holmium",
              symbol: "Ho",
              atomicMass: 164.93,
              radioactive: false,
              category: "Lanthanoid"
            },
            Er: {
              atomicNumber: 68,
              name: "Erbium",
              symbol: "Er",
              atomicMass: 167.26,
              radioactive: false,
              category: "Lanthanoid"
            },
            Tm: {
              atomicNumber: 69,
              name: "Thulium",
              symbol: "Tm",
              atomicMass: 168.93,
              radioactive: false,
              category: "Lanthanoid"
            },
            Yb: {
              atomicNumber: 70,
              name: "Ytterbium",
              symbol: "Yb",
              atomicMass: 173.05,
              radioactive: false,
              category: "Lanthanoid"
            },
            Lu: {
              atomicNumber: 71,
              name: "Lutetium",
              symbol: "Lu",
              atomicMass: 174.97,
              radioactive: false,
              category: "Lanthanoid"
            },
            Hf: {
              atomicNumber: 72,
              name: "Hafnium",
              symbol: "Hf",
              atomicMass: 178.49,
              radioactive: false,
              category: "Transition Metal"
            },
            Ta: {
              atomicNumber: 73,
              name: "Tantalum",
              symbol: "Ta",
              atomicMass: 180.94788,
              radioactive: false,
              category: "Transition Metal"
            },
            W: {
              atomicNumber: 74,
              name: "Tungsten",
              symbol: "W",
              atomicMass: 183.84,
              radioactive: false,
              category: "Transition Metal"
            },
            Re: {
              atomicNumber: 75,
              name: "Rhenium",
              symbol: "Re",
              atomic: 186.21,
              radioactive: false,
              category: "Transition Metal"
            },
            Os: {
              atomicNumber: 76,
              name: "Osmium",
              symbol: "Os",
              atomicMass: 190.23,
              radioactive: false,
              category: "Transition Metal"
            },
            Ir: {
              atomicNumber: 77,
              name: "Iridium",
              symbol: "Ir",
              atomicMass: 192.22,
              radioactive: false,
              category: "Transition Metal"
            },
            Pt: {
              atomicNumber: 78,
              name: "Platinum",
              symbol: "Pt",
              atomicMass: 195.08,
              radioactive: false,
              category: "Transition Metal"
            },
            Au: {
              atomicNumber: 79,
              name: "Gold",
              symbol: "Au",
              atomicMass: 196.97,
              radioactive: false,
              category: "Transition Metal"
            },
            Hg: {
              atomicNumber: 80,
              name: "Mercury",
              symbol: "Hg",
              atomicMass: 200.59,
              radioactive: false,
              category: "Transition Metal"
            },
            Tl: {
              atomicNumber: 81,
              name: "Thallium",
              symbol: "Tl",
              atomicMass: 204.38,
              radioactive: false,
              category: "Basic Metal"
            },
            Pb: {
              atomicNumber: 82,
              name: "Lead",
              symbol: "Pb",
              atomicMass: 207.2,
              radioactive: false,
              category: "Basic Metal"
            },
            Bi: {
              atomicNumber: 83,
              name: "Bismuth",
              symbol: "Bi",
              atomicMass: 208.98,
              radioactive: false,
              category: "Basic Metal"
            },
            Po: {
              atomicNumber: 84,
              name: "Polonium",
              symbol: "Po",
              atomicMass: 209,
              radioactive: true,
              category: "Metalloid"
            },
            At: {
              atomicNumber: 85,
              name: "Astatine",
              symbol: "At",
              atomicMass: 210,
              radioactive: true,
              category: "Halogen"
            },
            Rn: {
              atomicNumber: 86,
              name: "Radon",
              symbol: "Rn",
              atomicMass: 222,
              radioactive: true,
              category: "Noble Gas"
            },
            Fr: {
              atomicNumber: 87,
              name: "Francium",
              symbol: "Fr",
              atomicMass: 223,
              radioactive: true,
              category: "Alkali Metal"
            },
            Ra: {
              atomicNumber: 88,
              name: "Radium",
              symbol: "Ra",
              atomicMass: 226,
              radioactive: true,
              category: "Alkaline Earth Metal"
            },
            Ac: {
              atomicNumber: 89,
              name: "Actinium",
              symbol: "Ac",
              atomicMass: 227,
              radioactive: true,
              category: "Actinide"
            },
            Th: {
              atomicNumber: 90,
              name: "Thorium",
              symbol: "Th",
              atomicMass: 232.04,
              radioactive: true,
              category: "Actinide"
            },
            Pa: {
              atomicNumber: 91,
              name: "Protactinium",
              symbol: "Pa",
              atomicMass: 231.04,
              radioactive: true,
              category: "Actinide"
            },
            U: {
              atomicNumber: 92,
              name: "Uranium",
              symbol: "U",
              atomicMass: 238.03,
              radioactive: true,
              category: "Actinide"
            },
            Np: {
              atomicNumber: 93,
              name: "Neptunium",
              symbol: "Np",
              atomicMass: 237,
              radioactive: true,
              category: "Actinide"
            },
            Pu: {
              atomicNumber: 94,
              name: "Plutonium",
              symbol: "Pu",
              atomicMass: 244,
              radioactive: true,
              category: "Actinide"
            },
            Am: {
              atomicNumber: 95,
              name: "Americium",
              symbol: "Am",
              atomicMass: 243,
              radioactive: true,
              category: "Actinide"
            },
            Cm: {
              atomicNumber: 96,
              name: "Curium",
              symbol: "Cm",
              atomicMass: 247,
              radioactive: true,
              category: "Actinide"
            },
            Bk: {
              atomicNumber: 97,
              name: "Berylium",
              symbol: "Bk",
              atomicMass: 247,
              radioactive: true,
              category: "Actinide"
            },
            Cf: {
              atomicNumber: 98,
              name: "Californium",
              symbol: "Cf",
              atomicMass: 251,
              radioactive: true,
              category: "Actinide"
            },
            Es: {
              atomicNumber: 99,
              name: "Einsteinium",
              symbol: "Es",
              atomicMass: 252,
              radioactive: true,
              category: "Actinide"
            },
            Fm: {
              atomicNumber: 100,
              name: "Fermium",
              symbol: "Fm",
              atomicMass: 257,
              radioactive: true,
              category: "Actinide"
            },
            Md: {
              atomicNumber: 101,
              name: "Mendelevium",
              symbol: "Md",
              atomicMass: 258,
              radioactive: true,
              category: "Actinide"
            },
            No: {
              atomicNumber: 102,
              name: "Nobelium",
              symbol: "No",
              atomicMass: 259,
              radioactive: true,
              category: "Actinide"
            },
            Lr: {
              atomicNumber: 103,
              name: "Lawrencium",
              symbol: "Lr",
              atomicMass: 266,
              radioactive: true,
              category: "Actinide"
            },
            Rf: {
              atomicNumber: 104,
              name: "Rutherfordium",
              symbol: "Rf",
              atomicMass: 267,
              radioactive: true,
              category: "Transition Metal"
            },
            Db: {
              atomicNumber: 105,
              name: "Dubnium",
              symbol: "Db",
              atomicMass: 268,
              radioactive: true,
              category: "Transition Metal"
            },
            Sg: {
              atomicNumber: 106,
              name: "Seaborgium",
              symbol: "Sg",
              atomicMass: 269,
              radioactive: true,
              category: "Transition Metal"
            },
            Bh: {
              atomicNumber: 107,
              name: "Bohrium",
              symbol: "Bh",
              atomicMass: 270,
              radioactive: true,
              category: "Transition Metal"
            },
            Hs: {
              atomicNumber: 108,
              name: "Hassium",
              symbol: "Hs",
              atomicMass: 277,
              radioactive: true,
              category: "Transition Metal"
            },
            Mt: {
              atomicNumber: 109,
              name: "Meitnerium",
              symbol: "Mt",
              atomicMass: 278,
              radioactive: true,
              category: "Transition Metal"
            },
            Ds: {
              atomicNumber: 110,
              name: "Darmstadtium",
              symbol: "Ds",
              atomicMass: 281,
              radioactive: true,
              category: "Transition Metal"
            },
            Rg: {
              atomicNumber: 111,
              name: "Roentgenium",
              symbol: "Rg",
              atomicMass: 282,
              radioactive: true,
              category: "Transition Metal"
            },
            Cn: {
              atomicNumber: 112,
              name: "Copernicium",
              symbol: "Cn",
              atomicMass: 285,
              radioactive: true,
              category: "Transition Metal"
            },
            Nh: {
              atomicNumber: 113,
              name: "Nihonium",
              symbol: "Nh",
              atomicMass: 286,
              radioactive: true,
              category: "Basic Metal"
            },
            Fl: {
              atomicNumber: 114,
              name: "Flerovium",
              symbol: "Fl",
              atomicMass: 289,
              radioactive: true,
              category: "Basic Metal"
            },
            Mc: {
              atomicNumber: 115,
              name: "Moscovium",
              symbol: "Mc",
              atomicMass: 290,
              radioactive: true,
              category: "Basic Metal"
            },
            Lv: {
              atomicNumber: 116,
              name: "Livermorium",
              symbol: "Lv",
              atomicMass: 293,
              radioactive: true,
              category: "Basic Metal"
            },
            Ts: {
              atomicNumber: 117,
              name: "Tennessine",
              symbol: "Ts",
              atomicMass: 294,
              radioactive: false,
              category: "Halogen"
            },
            Og: {
              atomicNumber: 118,
              name: "Oganesson",
              symbol: "Og",
              atomicMass: 294,
              radioactive: true,
              category: "Noble Gas"
            }
        }
    }

    calc() {
        let element = {};
        for (const key in this.elements) {
            if (this.data.toString().toLocaleUpperCase() === key.toString().toLocaleUpperCase()) {
              element = this.elements[key];
              switch(this.elements[key].category) {
                case "Non-metal":
                  element["backgroundColor"] = "#52FFF9";
                  break;
                case "Metalloid":
                  element["backgroundColor"] = "#FC1C8C";
                  break;
                case "Actinide":
                  element["backgroundColor"] = "#9812FF"
                  break;
                case "Halogen":
                  element["backgroundColor"] = "#447A40";
                  break;
                case "Basic Metal":
                  element["backgroundColor"] = "#A60A02";
                  break;
                case "Transition Metal":
                  element["backgroundColor"] = "#5BE81E";
                  break;
                case "Lanthanoid":
                  element["backgroundColor"] = "#06C94A";
                  break;
                case "Noble Gas":
                  element["backgroundColor"] = "#A371B0";
                  break;
                case "Alkali Metal":
                  element["backgroundColor"] = "#E000D5";
                  break;
                case "Alkaline Earth Metal":
                  element["backgroundColor"] = "#A4B538";
                  break;
                default:
                  element["backgroundColor"] = "#0af";
                  break;
              }
            }
          }
    
          const elementElectronConfig = this.findElectronConfiguration(element.atomicNumber);
    
          return {atomicNumber: element.atomicNumber, elementSymbol: element.symbol, name: element.name, atomicMass: element.atomicMass, electronConfig: elementElectronConfig, category: element.category, backgroundColor: element.backgroundColor}
    }

    findElectronConfiguration(a) {
        let orbitals;
        const He = "1s2 ";
        const Ne = "1s2 2s2 2p6 ";
        const Ar = "1s2 2s2 2p6 3s2 3p6 ";
        const Kr = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 ";
        const Xe = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 ";
        const Rn = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 4f14 6s2 5d10 6p6 ";
  
        switch(a) {
          case 1:
            orbitals = ("1s1");
            break;
          case 2:
            orbitals = ("1s2");
            break;
          case 3:
            orbitals = (`${He}2s1`);
            break;
          case 4:
            orbitals = (`${He}2s2`);
            break;
          case 5:
            orbitals = (`${He}2s2 2p1`);
            break;
          case 6:
              orbitals = (`${He}2s2 2p2`);
            break;
          case 7:
            orbitals = (`${He}2s2 2p3`);
            break;
          case 8:
            orbitals = (`${He}2s2 2p4`);
            break;
          case 9:
            orbitals = (`${He}2s2 2p5`);
            break;
          case 10:
            orbitals = (`${He}2s2 2p6`);
            break;
          case 11:
            orbitals = (`${Ne}3s1`);
            break;
          case 12:
            orbitals = (`${Ne}3s2`);
            break;
          case 13:
            orbitals = (`${Ne}3s2 3p1`);
            break;
          case 14:
            orbitals = (`${Ne}3s2 3p2`);
            break;
          case 15:
            orbitals = (`${Ne}3s2 3p3`);
            break;
          case 16:
            orbitals = (`${Ne}3s2 3p4`);
            break;
          case 17:
            orbitals = (`${Ne}3s2 3p5`);
            break;
          case 18:
            orbitals = (`${Ne}3s2 3p6`);
            break;
          case 19:
            orbitals = (`${Ar}4s1`);
            break;
          case 20:
            orbitals = (`${Ar}4s2`);
            break;
          case 21:
            orbitals = (`${Ar}3d1 4s2`);
            break;
          case 22:
            orbitals = (`${Ar}3d2 4s2`);
            break;
          case 23:
            orbitals = (`${Ar}3d3 4s2`);
            break;
          case 24:
            orbitals = (`${Ar}3d5 4s1`);
            break;
          case 25:
            orbitals = (`${Ar}3d5 4s2`);
            break;
          case 26:
            orbitals = (`${Ar}3d6 4s2`);
            break;
          case 27:
            orbitals = (`${Ar}3d7 4s2`);
            break;
          case 28:
            orbitals = (`${Ar}3d8 4s2`);
            break;
          case 29:
            orbitals = (`${Ar}3d10 4s1`);
            break;
          case 30:
            orbitals = (`${Ar}3d10 4s2`);
            break;
          case 31:
            orbitals = (`${Ar}3d10 4s2 4p1`);
            break;
          case 32:
            orbitals = (`${Ar}3d10 4s2 4p2`);
            break;
          case 33:
            orbitals = (`${Ar}3d10 4s2 4p3`);
            break;
          case 34:
            orbitals = (`${Ar}3d10 4s2 4p4`);
            break;
          case 35:
            orbitals = (`${Ar}3d10 4s2 4p5`);
            break;
          case 36:
            orbitals = (`${Ar}3d10 4s2 4p6`);
            break;
          case 37:
            orbitals = (`${Kr}5s1`);
            break;
          case 38:
            orbitals = (`${Kr}5s2`);
            break;
          case 39:
              orbitals = (`${Kr}4d1 5s2`);
            break;
          case 40:
            orbitals = (`${Kr}4d2 5s2`);
            break;
          case 41:
            orbitals = (`${Kr}4d4 5s1`);
            break;
          case 42:
            orbitals = (`${Kr}4d5 5s1`);
            break;
          case 43:
            orbitals = (`${Kr}4d5 5s2`);
            break;
          case 44:
            orbitals = (`${Kr}4d7 5s1`);
            break;
          case 45:
            orbitals = (`${Kr}4d8 5s1`);
            break;
          case 46:
            orbitals = (`${Kr}4d10`);
            break;
          case 47:
            orbitals = (`${Kr}4d10 5s1`);
            break;
          case 48:
            orbitals = (`${Kr}4d10 5s2`);
            break;
          case 49:
            orbitals = (`${Kr}4d10 5s2 5p1`);
            break;
          case 50:
            orbitals = (`${Kr}4d10 5s2 5p2`);
            break;
          case 51:
            orbitals = (`${Kr}4d10 5s2 5p3`);
            break;
          case 52:
            orbitals = (`${Kr}4d10 5s2 5p4`);
            break;
          case 53:
            orbitals = (`${Kr}4d10 5s2 5p5`);
            break;
          case 54:
            orbitals = (`${Kr}4d10 5s2 5p6`);
            break;
          case 55:
            orbitals = (`${Xe}6s1`);
            break;
          case 56:
            orbitals = (`${Xe}6s2`);
            break;
          case 57:
            orbitals = (`${Xe}5d1 6s2`);
            break;
          case 58:
            orbitals = (`${Xe}4f1 5d1 6s2`);
            break;
          case 59:
            orbitals = (`${Xe}4f3 6s2`);
            break;
          case 60:
            orbitals = (`${Xe}4f4 6s2`);
            break;
          case 61:
            orbitals = (`${Xe}4f5 6s2`);
            break;
          case 62:
            orbitals = (`${Xe}4f6 6s2`);
            break;
          case 63:
            orbitals = (`${Xe}4f7 6s2`);
            break;
          case 64:
            orbitals = (`${Xe}4f7 5d1 6s2`);
            break;
          case 65:
            orbitals = (`${Xe}4f9 6s2`);
            break;
          case 66:
            orbitals = (`${Xe}4f10 6s2`);
            break;
          case 67:
            orbitals = (`${Xe}4f11 6s2`);
            break;
          case 68:
            orbitals = (`${Xe}4f12 6s2`);
            break;
          case 69:
            orbitals = (`${Xe}4f13 6s2`);
            break;
          case 70:
            orbitals = (`${Xe}4f14 6s2`);
            break;
          case 71:
            orbitals = (`${Xe}4f14 5d1 6s2`);
            break;
          case 72:
            orbitals = (`${Xe}4f14 5d2 6s2`);
            break;
          case 73:
            orbitals = (`${Xe}4f14 5d3 6s2`);
            break;
          case 74:
            orbitals = (`${Xe}4f14 5d4 6s2`);
            break;
          case 75:
            orbitals = (`${Xe}4f14 5d5 6s2`);
            break;
          case 76:
            orbitals = (`${Xe}4f14 5d6 6s2`);
            break;
          case 77:
            orbitals = (`${Xe}4f14 5d7 6s2`);
            break;
          case 78:
            orbitals = (`${Xe}4f14 5d9 6s1`);
            break;
          case 79:
            orbitals = (`${Xe}4f14 5d10 6s1`);
            break;
          case 80:
            orbitals = (`${Xe}4f14 5d10 6s2`);
            break;
          case 81:
            orbitals = (`${Xe}4f14 5d10 6s2 6p1`);
            break;
          case 82:
            orbitals = (`${Xe}4f14 5d10 6s2 6p2`);
            break;
          case 83:
            orbitals = (`${Xe}4f14 5d10 6s2 6p3`);
            break;
          case 84:
            orbitals = (`${Xe}4f14 5d10 6s2 6p4`);
            break;
          case 85:
            orbitals = (`${Xe}4f14 5d10 6s2 6p5`);
            break;
          case 86:
            orbitals = (`${Xe}4f14 5d10 6s2 6p6`);
            break;
          case 87:
            orbitals = (`${Rn}7s1`);
            break;
          case 88:
            orbitals = (`${Rn}7s2`);
            break;
          case 89:
            orbitals = (`${Rn}6d1 7s2`);
            break;
          case 90:
            orbitals = (`${Rn}6d2 7s2`);
            break;
          case 91:
            orbitals = (`${Rn}5f2 6d1 7s2`);
            break;
          case 92:
            orbitals = (`${Rn}5f3 6d1 7s2`);
            break;
          case 93:
            orbitals = (`${Rn}5f4 6d1 7s2`);
            break;
          case 94:
            orbitals = (`${Rn}5f6 7s2`);
            break;
          case 95:
            orbitals = (`${Rn}5f7 7s2`);
            break;
          case 96:
            orbitals = (`${Rn}5f7 6d1 7s2`);
            break;
          case 97:
            orbitals = (`${Rn}5f9 7s2`);
            break;
          case 98:
            orbitals = (`${Rn}5f10 7s2`);
            break;
          case 99:
            orbitals = (`${Rn}5f11 7s2`);
            break;
          case 100:
            orbitals = (`${Rn}5f12 7s2`);
            break;
          case 101:
            orbitals = (`${Rn}5f13 7s2`);
            break;
          case 102:
            orbitals = (`${Rn}5f14 7s2`);
            break;
          case 103:
            orbitals = (`${Rn}5f14 7s2 7p1`);
            break;
          case 104:
            orbitals = (`${Rn}5f14 6d2 7s2`);
            break;
          case 105:
            orbitals = (`${Rn}5f14 6d3 7s2`);
            break;
          case 106:
            orbitals = (`${Rn}5f14 6d4 7s2`);
            break;
          case 107:
            orbitals = (`${Rn}5f14 6d5 7s2`);
            break;
          case 108:
            orbitals = (`${Rn}5f14 6d6 7s2`);
            break;
          case 109:
            orbitals = (`${Rn}5f14 6d7 7s2`);
            break;
          case 110:
            orbitals = (`${Rn}5f14 6d9 7s1`);
            break;
          case 111:
            orbitals = (`${Rn}5f14 6d10 7s1`);
            break;
          case 112:
            orbitals = (`${Rn}5f14 6d10 7s2`);
            break;
          case 113:
            orbitals = (`${Rn}5f14 6d10 7s2 7p1`);
            break;
          case 114:
            orbitals = (`${Rn}5f14 6d10 7s2 7p2`);
            break;
          case 115:
            orbitals = (`${Rn}5f14 6d10 7s2 7p3`);
            break;
          case 116:
            orbitals = (`${Rn}5f14 6d10 7s2 7p4`);
            break;
          case 117:
            orbitals = (`${Rn}5f14 6d10 7s2 7p5`);
            break;
          case 118:
            orbitals = (`${Rn}5f14 6d10 7s2 7p6`);
            break;
        }
        return orbitals;
    }
}

module.exports.ChemistryScience = (data) => {
    return new ChemistryScience(data).calc();
};