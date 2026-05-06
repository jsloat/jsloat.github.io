import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LifeInSeattle from "./LifeInSeattle";

const albumHtml = `
<!DOCTYPE html>
<html>
  <head>
    <style>body { background: #fff; }</style>
  </head>
  <body>
    <main>
      <h1>Life in Seattle</h1>
      <figure class="card">
        <button
          data-action="open-export-media"
          data-media-type="image"
          data-media-name="beach.jpg"
          data-media-caption="At the beach"
        >
          <img src="./assets/beach.jpg" alt="beach.jpg" />
        </button>
      </figure>
    </main>
  </body>
</html>
`;

describe("LifeInSeattle", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      text: async () => albumHtml,
    } as Response);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the album inline and opens media in a top-level modal", async () => {
    const { container } = render(<LifeInSeattle />);

    await waitFor(() =>
      expect(screen.getByText("Life in Seattle")).toBeInTheDocument()
    );

    expect(container.querySelector("iframe")).toBeNull();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("At the beach")).toBeInTheDocument();
    expect(container.querySelector('img[src="/albums/life-in-seattle/assets/beach.jpg"]')).toBeTruthy();
  });
});
