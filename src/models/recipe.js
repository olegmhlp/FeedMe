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
    source,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.views = views;
    this.trending = trending;
    this.directions = directions;
    this.ingredients = ingredients;
    this.description = description;
    this.source = source;
  }
}

export default Recipe;
