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

const playgroundDescription = `\
# Welcome to the FunQL Playground

The FunQL Playground allows anyone to experiment with [FunQL](https://funql.io) — the Functional Query Language — 
through a simple UI.

To learn more about FunQL, visit [funql.io](https://funql.io).

---

## Getting started

1. Select a **request** from the sidebar  
2. Edit the **FunQL query parameters**  
3. Click **Send** to see the result

---

## Learn more

- 📖 [funql.io](https://funql.io) – official documentation  
- 💻 [GitHub repository](https://github.com/funql/funql-playground) – source code
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