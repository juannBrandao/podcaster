import { createContext, useState, ReactNode } from "react";
type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setPlayState: (state: boolean) => void;
  togglePlay: () => void;
};
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};
export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setepisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setepisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }
  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }
  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
