"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState, useCallback, useEffect } from "react";
import { getVideoLink, getDramaInfoOnWatch, getDramaDownload } from "@/fetch";
import WatchEpisodeButtons from "@/components/containers/kdrama/watch-episode";
import { DramaInfo } from "@/types";
import { Button } from "@/components/ui/button";

const EpisodeContainer = ({ params }: any) => {
  const { id, episode } = params;
  const [isLoading, setLoading] = useState(true);
  const [videoLink, setVideoLink] = useState(null);
  const [download, setDownloadLink] = useState(null);
  const [info, setDramaInfo] = useState<DramaInfo | null>(null);

  const fetchDetails = useCallback(async () => {
    try {
      const episode_link = await getVideoLink(episode, id);
      const download_link = await getDramaDownload(episode);
      const info = await getDramaInfoOnWatch(id);
      setVideoLink(episode_link);
      setDownloadLink(download_link.downloadLink);
      setDramaInfo(info);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, episode]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="pb-1 mx-auto px-4 pt-10">
      <div className="pb-4">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="flex flex-col flex-wrap pb-2">Episode: {episode}</div>
          <Link href={download || ""}>
            <Button>Download EP</Button>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex">
        {isLoading ? (
          <Skeleton className="mx-auto px-4 pt-10 w-full h-[500px]" />
        ) : (
          <>
            <MediaPlayer src={videoLink || ""}>
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </>
        )}
      </div>
      {info && <WatchEpisodeButtons data={info?.episodes} id={id} />}
    </div>
  );
};

export default EpisodeContainer;
