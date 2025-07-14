import {Specification, SpecificationRequestItem} from "@/lib/specification";

const listDesigners: SpecificationRequestItem = {
  id: "listDesigners",
  name: "/designers",
  request: {
    method: "GET",
    url: "/v1beta1/designers",
    body: "",
    pathParameters: [],
    queryParameters: [
      ["filter", "has(lower(name), \"burkhard\")"],
      ["sort", "asc(name)"],
      ["skip", "0"],
      ["limit", "100"],
      ["count", "false"]
    ],
    headers: []
  }
}
const listMinifigures: SpecificationRequestItem = {
  id: "listMinifigures",
  name: "/minifigures",
  request: {
    method: "GET",
    url: "/v1beta1/minifigures",
    body: "",
    pathParameters: [],
    queryParameters: [
      ["filter", "stw(name, \"SW\")"],
      ["sort", "asc(name)"],
      ["skip", "0"],
      ["limit", "100"],
      ["count", "false"]
    ],
    headers: []
  }
}
const listSets: SpecificationRequestItem = {
  id: "listSets",
  name: "/sets",
  request: {
    method: "GET",
    url: "/v1beta1/sets",
    body: "",
    pathParameters: [],
    queryParameters: [
      ["filter", "and(\n  eq(theme, \"STAR_WARS\"),\n  gte(price, 500),\n  gt(year(launchTime), 2010)\n)"],
      ["sort", "desc(price)"],
      ["skip", "0"],
      ["limit", "100"],
      ["count", "false"]
    ],
    headers: []
  }
}

// TODO: Update description
const playgroundDescription = `\
# Nec inpedit puer

## Erat silvas regnum alma mollia

Lorem markdownum sinistrum partim; ne cum est est area ad bella fronti, sororque
contraria praenuntia qua. **Liquefacta** meruisse quem vincemur Tydidae ignotis,
tritumque mansit. **Suscitat sim potestas** super si altos attonitamque accipe
ferre corripiunt vidi.

Turba geminos undique [iacet occupet frena](http://eurytionflammis.io/) Arcadiae
consueta lacrimis, tetigit, ignaram pater frenataque super. *Vos* hosti,
[per](http://sagax.com/) nos speciem; aeratas *illa cum nihil* moriens, qua.

## Novissima Aurora tardis esse pacifer frondes nam

Piscis cubilia natamque, duce accipit locuta. Sua quercu exceptas mollibus,
totiens Lucifero nullus. Est missum ab ora nubes Iuno iuvencos; super dona
posuit, et. Est viseret fungi, reperta vixisti, lacrimas, tu vult, ab sospite
talia.

Tuo ille quam omnes ut vulnere corde trabe corpora dixit adest vides nescia,
*grates* suppressa. Oravere umorque, in orbem sollicitumque caeli anguis magni
praestatque tollere posse, flamma Avernae posse. Stipite primaque de tempus,
barbaricoque fumant nisi Siculae. Et si femina, sive minimo! Subiectas sic adhuc
tuorum, quam amnes vota Lycaon aquas ante, aquis nescit.

## Tradiderat est villosis veluti in fessa Cyllenide

In quod nec sanguine infelix turritaque dabant, faciat illam usae Argolis quos.
Monstri nurumque, frondes, inplet hasta, *arbore* et subdita nam non curvos.
Quod satus: atque ingeminat Eurynome. Resonabilis adhuc riguisse, mihi novandi
[frustra spatiosumque obruta](http://www.exstant.net/) ad. Si centum medicamine
barba puellae per foro mortale loquiturque mihi.

1. Videri fecerat colligit
2. Quaecumque litoris opem
3. Postquam sedebat expellere nil barba possunt ultima
`

export const funqlPlaygroundApiSpec: Specification = {
  id: "playgroundApi",
  name: "FunQL Playground API",
  description: playgroundDescription,
  basePath: "https://api.play.funql.io",
  items: [
    {
      id: "v1beta1",
      name: "v1beta1",
      items: [
        {
          id: "designers",
          name: "designers",
          items: [
            listDesigners
          ]
        },
        {
          id: "minifigures",
          name: "minifigures",
          items: [
            listMinifigures
          ]
        },
        {
          id: "sets",
          name: "sets",
          items: [
            listSets
          ]
        }
      ]
    }
  ]
}