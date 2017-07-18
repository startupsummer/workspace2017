export function fetchList() {
  return new Promise(resolve => resolve([
    //here should be request to github
    {
      "id": 242209479,
      "title": "Best way to load a folder of static files?",
      "state": "open",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam volutpat, ex non convallis fringilla, felis nunc accumsan ex, eget dapibus libero urna in sem. Nullam mauris ex, volutpat suscipit fermentum non, pharetra nec purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam viverra turpis vitae sem pharetra placerat non quis neque. Sed bibendum auctor velit et venenatis. Aliquam at viverra est, vel aliquam enim. Nam",
    },
    {
      "id": 242209480,
      "title": "Slow production build ",
      "state": "open",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]))
}