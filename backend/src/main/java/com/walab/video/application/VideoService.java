package com.walab.video.application;

import com.walab.exception.video.VideoNotFoundException;
import com.walab.playlist.domain.Playlist;
import com.walab.playlist.domain.repository.PlaylistRepository;
import com.walab.video.application.dto.VideoCUDto;
import com.walab.video.application.dto.VideoDeleteDto;
import com.walab.video.application.dto.VideoDto;
import com.walab.video.domain.Video;
import com.walab.video.domain.repository.VideoRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final VideoRepository videoRepository;
    private final PlaylistRepository playlistRepository;

    @Transactional
    public VideoDto create(VideoCUDto videoCUDto, Long playlistId) {
        Playlist playlist = playlistRepository.findPlaylistById(playlistId);
        playlist.setTotalDuration(playlist.getTotalDuration()+videoCUDto.getDuration());
        Video newVideo = new Video(videoCUDto, playlist);
        Video savedVideo = videoRepository.save(newVideo);
        return savedVideo.toDto();
    }

    @Transactional
    public VideoDeleteDto delete(VideoDeleteDto videoDeleteDto) {
        Video video = videoRepository.findById(videoDeleteDto.getVideoId()).orElseThrow(VideoNotFoundException::new);
        video.getPlaylist().setTotalDuration(video.getPlaylist().getTotalDuration()-video.getDuration());

        videoRepository.deleteById(video.getId());
        return videoDeleteDto;
    }

    @Transactional
    public VideoDto update(Long videoId, VideoCUDto videoCUDto) {
        Video video = videoRepository.findById(videoId).orElseThrow(VideoNotFoundException::new);
        Playlist playlist = video.getPlaylist();
        playlist.setTotalDuration(playlist.getTotalDuration()-video.getDuration());
        video.update(videoCUDto);
        playlist.setTotalDuration(playlist.getTotalDuration()+video.getDuration());
        return video.toDto();
    }
}
