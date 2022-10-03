package com.walab.video.application.dto;

import com.walab.content.presentation.response.ContentIdResponse;
import com.walab.video.presentation.request.VideoDeleteRequest;
import com.walab.video.presentation.response.VideoDeleteResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VideoDeleteDto {
    private Long playlistId;
    private Long videoId;

    public VideoDeleteDto(VideoDeleteRequest videoDeleteRequest) {
        this.playlistId = videoDeleteRequest.getPlaylistId();
        this.videoId = videoDeleteRequest.getVideoId();
    }
    public VideoDeleteResponse contentIdResponse(){
        return new VideoDeleteResponse(videoId);
    }

}
