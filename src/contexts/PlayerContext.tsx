import { createContext, useState, ReactNode, useContext } from "react";
import Episode from "../pages/episodes/[slug]";
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
  isLooping: boolean;
  isShuffleing: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleshuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayState: ()=> void;
  hasNext: boolean;
  hasPravious: boolean;
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
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffleing, setIsShuisShuffleing] = useState(false);

  function playList(list: Episode[], index: number) {
    setepisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }
  function play(episode: Episode) {
    setepisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }
  function toggleLoop() {
    setIsLooping(!isLooping);
  }
  function toggleshuffle() {
    setIsShuisShuffleing(!isShuffleing);
  }
  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }
  function clearPlayState() {
    setepisodeList([]);
    setCurrentEpisodeIndex(0);
  }
  const hasPravious = currentEpisodeIndex > 0;
  const hasNext = isShuffleing || (currentEpisodeIndex + 1) < episodeList.length;
  function playNext() {
    if (isShuffleing) {
      const nextRandomEpisodeIndex =Math.floor( Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }
  function playPrevious() {
    if (hasPravious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }
  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        isLooping,
        isShuffleing,
        togglePlay,
        setPlayState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPravious,
        toggleLoop,
        toggleshuffle,
        clearPlayState
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
