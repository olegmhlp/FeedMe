class Recipe {
  constructor(
    id,
    title,
    author,
    views,
    trending,
    directions,
    ingredients,
    description,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.views = views;
    this.trending = trending;
    this.directions = directions;
    this.ingredients = ingredients;
    this.description = description;
  }
}

export default Recipe;
