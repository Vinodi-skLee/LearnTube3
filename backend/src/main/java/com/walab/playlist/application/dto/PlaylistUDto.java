package com.walab.playlist.application.dto;

import com.walab.playlist.presentation.request.PlaylistUpdateRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaylistUDto {
    private Long playlistId;
    private String playlistName;
    private String description;

    public PlaylistUDto(PlaylistUpdateRequest entity) {
        this.playlistId = entity.getPlaylistId();
        this.playlistName = entity.getPlaylistName();
        this.description = entity.getDescription();
    }
}
