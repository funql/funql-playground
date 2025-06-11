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

export const funqlPlaygroundApiSpec: Specification = {
  id: "root",
  name: "FunQL Playground API",
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