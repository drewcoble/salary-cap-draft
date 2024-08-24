"use client";
import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import IPlayer from "@/interfaces/player";
import IDefense from "@/interfaces/defense";
import { useEffect, useState } from "react";
// import getPlayers from "@/data/getPlayers";
import IPlayerObj from "@/interfaces/playerObj";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import getPlayers from "@/data/getPlayers";
import { ELIGIBLE_POSITIONS } from "@/utilities/constants";

export default function Home() {
  const players = useQuery(api.players.get);
  const [positions, setPositions] = useState<string[]>(ELIGIBLE_POSITIONS);
  const [playerObj, setPlayerObj] = useState<IPlayerObj>({
    allPlayers: [],
    qbs: [],
    rbs: [],
    tes: [],
    wrs: [],
    defs: [],
  });

  // get days since Jan 1, 1970
  // this will be used to fetch new player data if the last fetch is less than this number (fetch once per day);
  const dayNumber = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    // handle change of selected positions
    const newPositions =
      typeof event.target.value === "string"
        ? [event.target.value]
        : event.target.value;
    setPositions(newPositions);
  };

  useEffect(() => {
    getPlayers(players).then((res) => {
      if (res.allPlayers !== undefined && res.allPlayers.length > 0) {
        setPlayerObj(res);
      }
    });
  }, [players]);

  return (
    <Grid container direction="column">
      <Grid
        item
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          minHeight: "50px",
          position: "fixed",
          pb: "10px",
          pl: "5px",
          pt: "10px",
          top: 0,
          width: "100%",
        }}
      >
        <Select
          id="positions-select"
          value={positions}
          label="Positions"
          multiple
          onChange={(e) => handleChange(e)}
          variant="outlined"
        >
          <MenuItem value={"QB"}>QB</MenuItem>
          <MenuItem value={"RB"}>RB</MenuItem>
          <MenuItem value={"WR"}>WR</MenuItem>
          <MenuItem value={"TE"}>TE</MenuItem>
          <MenuItem value={"DEF"}>DEF</MenuItem>
        </Select>
      </Grid>
      <Grid item pt={10}>
        <Typography>Quarterbacks</Typography>
        <div>
          {positions.includes("QB") &&
            playerObj.qbs.map((p) => (
              <div
                key={p.player_id}
                style={{ alignItems: "center", display: "flex" }}
              >
                <span
                  style={{
                    backgroundColor: "burlywood",
                    borderRadius: 6,
                    fontSize: "0.6rem",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  QB
                </span>
                {p.full_name}&nbsp;
                <span style={{ fontVariant: "small-caps" }}>
                  {" "}
                  - {p.team ?? "FA"}
                </span>
              </div>
            ))}
        </div>
        <Typography>Running Backs</Typography>
        <div>
          {positions.includes("RB") &&
            playerObj.rbs.map((p) => (
              <div
                key={p.player_id}
                style={{ alignItems: "center", display: "flex" }}
              >
                <span
                  style={{
                    backgroundColor: "aquamarine",
                    borderRadius: 6,
                    fontSize: "0.6rem",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  RB
                </span>
                {p.full_name}&nbsp;
                <span style={{ fontVariant: "small-caps" }}>
                  {" "}
                  - {p.team ?? "FA"}
                </span>
              </div>
            ))}
        </div>
        <Typography>Wide Receivers</Typography>
        <div>
          {positions.includes("WR") &&
            playerObj.wrs.map((p) => (
              <div
                key={p.player_id}
                style={{ alignItems: "center", display: "flex" }}
              >
                <span
                  style={{
                    backgroundColor: "goldenrod",
                    borderRadius: 6,
                    fontSize: "0.6rem",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  WR
                </span>
                {p.full_name}&nbsp;
                <span style={{ fontVariant: "small-caps" }}>
                  {" "}
                  - {p.team ?? "FA"}
                </span>
              </div>
            ))}
        </div>
        <Typography>Tight Ends</Typography>

        {positions.includes("TE") &&
          playerObj.tes.map((p) => (
            <div
              key={p.player_id}
              style={{ alignItems: "center", display: "flex" }}
            >
              <span
                style={{
                  backgroundColor: "lavender",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  margin: 5,
                  padding: 5,
                }}
              >
                TE
              </span>
              {p.full_name}&nbsp;
              <span style={{ fontVariant: "small-caps" }}>
                {" "}
                - {p.team ?? "FA"}
              </span>
            </div>
          ))}

        {positions.includes("DEF") && (
          <React.Fragment>
            <Typography>Defense/Special Teams</Typography>
            {playerObj.defs.map((p) => (
              <div
                key={p.player_id}
                style={{ alignItems: "center", display: "flex" }}
              >
                <span
                  style={{
                    backgroundColor: "saddlebrown",
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: "0.6rem",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  D&nbsp;/&nbsp;ST
                </span>
                {p.player_id}&nbsp;
                <span style={{ fontVariant: "small-caps" }}>d/st</span>
              </div>
            ))}
          </React.Fragment>
        )}
      </Grid>

      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </Grid>
  );
}
