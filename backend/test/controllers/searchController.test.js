import sinon from "sinon";
import { rewiremock } from "../../rewiremock.es6.js";
import { describe, it, beforeEach, afterEach } from "mocha";

describe("Test the api call to search the movies", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("Test the search api based on keyword", async () => {
    const fakeMovieSearchData = {
      titles: [
        {
          id: "mv123",
          originalTitle: "Movie Title",
          primaryImage: {
            url: "imageUrl",
          },
          startYear: "2026",
          rating: {
            aggregateRating: 8.3,
          },
        },
      ],
    };
    const fakeGenres = ["Fantasy", "Comedy", "Action", "Revenge"];
    const req = {
      query: {
        key: "mo",
      },
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub(),
    };
    const expectedResData = [];
    for (let j = 0; j < fakeMovieSearchData.titles.length; j++) {
      const data = {
        id: fakeMovieSearchData.titles[j].id,
        title: fakeMovieSearchData.titles[j].originalTitle,
        imgUrl: fakeMovieSearchData.titles[j].primaryImage.url,
        year: fakeMovieSearchData.titles[j].startYear,
        rating: fakeMovieSearchData.titles[j].rating.aggregateRating,
        genres: fakeGenres,
      };

      expectedResData.push(data);
    }

    const { search } = await rewiremock.around(
      () => import("../../src/controllers/searchController.js"),
      (rewiremock) => {
        rewiremock(() => import("../../src/services/movieDataService.js")).with(
          {
            searchMovie: async (key = "mo") => {
              console.log("searchMovie called with key:", key);
              return fakeMovieSearchData;
            },
            searchMovieGenre: async (id = "mv123") => {
              console.log("searchMovieGenre called with id:", id);
              return fakeGenres;
            },
          },
        );
      },
    );

    await search(req, res);

    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, expectedResData);
  });
});
