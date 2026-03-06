import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import assert from "assert";
import {
  searchMovie,
  searchMovieGenre,
} from "../../src/services/movieDataService.js";
import { describe, it, before } from "mocha";

let axiosMock = null;

before(() => {
  axiosMock = new AxiosMockAdapter(axios);
});

describe("Test service to fetch movie data based on keywords", () => {
  const key = "dfdf";

  // successful api response.
  it("Successful fetch of the movie data from API", async () => {
    const successfulResponse = {
      id: "mv123",
      originalTitle: "Movie Title",
      primaryImage: {
        url: "imageUrl",
      },
      startYear: "2026",
      rating: {
        aggregateRating: 8.3,
      },
    };
    axiosMock
      .onGet(`https://api.imdbapi.dev/search/titles?query=${key}`)
      .reply(200, successfulResponse);

    assert.deepStrictEqual(await searchMovie(key), successfulResponse);
  });

  // failed api response.
  it("Failed fetch of the movie data from API due to network error", async () => {
    axiosMock
      .onGet(`https://api.imdbapi.dev/search/titles?query=${key}`)
      .networkError();
    await assert.rejects(searchMovie(key), (err) => {
      assert.strictEqual(err.name, "Error");
      assert.strictEqual(err.message, "Internal Server Error!");
      assert.strictEqual(err.cause.message, "Network Error");
      return true;
    });
  });
});
describe("Test service to fetch movie genres based on movie-id", () => {
  const id = "movie-id";

  // successful api response.
  it("Successful fetch of the movie genres from API", async () => {
    const successfulResponse = {
      id: id,
      genres: ["Fantasy", "Comedy", "Action", "Revenge"],
    };
    axiosMock
      .onGet(`https://api.imdbapi.dev/titles/${id}`)
      .reply(200, successfulResponse);

    assert.deepStrictEqual(
      await searchMovieGenre(id),
      successfulResponse.genres,
    );
  });

  // failed api response.
  it("Failed fetch of the movie genres from API due to network error", async () => {
    axiosMock.onGet(`https://api.imdbapi.dev/titles/${id}`).networkError();
    await assert.rejects(searchMovieGenre(id), (err) => {
      assert.strictEqual(err.name, "Error");
      assert.strictEqual(err.message, "Internal Server Error!");
      assert.strictEqual(err.cause.message, "Network Error");
      return true;
    });
  });
});
