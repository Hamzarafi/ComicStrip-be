import axios from "axios";
import { Request, Response } from "express";
import { getDatabase } from "../db/database";

let latestComicNumber: number | null = null; // Cache for latest Comic

const getLatestComic = async () => {
  if (!latestComicNumber) await fetchLatestComic();
  if (latestComicNumber == null) {
    throw new Error("Could not fetch the latest comic number.");
  }
  return latestComicNumber;
};

const fetchLatestComic = async () => {
  const response = await axios.get("https://xkcd.com/info.0.json");
  latestComicNumber = response.data.num;
  return response.data;
};

const fetchComic = async (comicNumber: number) => {
  if (!comicNumber) return await fetchLatestComic();
  const response = await axios.get(
    `https://xkcd.com/${comicNumber}/info.0.json`
  );
  return response.data;
};

export const getComic = async (req: Request, res: Response) => {
  let latest = false;
  const comicNumber = parseInt(req.params.comicNumber);

  try {
    const data = await fetchComic(comicNumber);
    const db = await getDatabase();
    let comicViews = await db.get(
      "SELECT * FROM comics WHERE comic_num = ?",
      data.num
    );

    if (!comicViews) {
      await db.run(
        "INSERT INTO comics (comic_num, views) VALUES (?, ?)",
        data.num,
        0
      );
      comicViews = { comic_num: data.num, views: 0 };
    }

    // Increment view count
    await incrementComicViews(comicViews.comic_num);
    comicViews.views += 1;

    if (await getLatestComic() == data.num) latest = true;

    res.status(200).json({ ...data, views: comicViews.views, latest });
  } catch (error) {
    console.error("Error fetching comic:", error);
    res.status(500).json({ error: "Failed to fetch comic" });
  }
};

// Function to get a random comic
export const getRandomComic = async (req: Request, res: Response) => {
  try {
    const randomComicNum = Math.floor(Math.random() * await getLatestComic() - 1) + 1; // Random comic number
    res.status(200).json({ num: randomComicNum });
  } catch (error) {
    console.error("Error fetching random comic number:", error);
    res.status(500).json({ error: "Failed to fetch random comic number" });
  }
};

// Function to increment view count
export const incrementComicViews = async (comicNumber: number) => {
  const db = await getDatabase();
  await db.run(
    "UPDATE comics SET views = views + 1 WHERE comic_num = ?",
    comicNumber
  );
};
