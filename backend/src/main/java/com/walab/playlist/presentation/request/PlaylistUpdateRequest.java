package com.walab.playlist.presentation.request;

import com.walab.playlist.application.dto.PlaylistCUDto;
import com.walab.playlist.application.dto.PlaylistUDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class PlaylistUpdateRequest {
    private Long playlistId;
    private String playlistName;
    private String description;

    public PlaylistCUDto playlistCUDto() {
        return new PlaylistCUDto(playlistId, playlistName, description);
    }
    public PlaylistUDto playlistUDto(){return new PlaylistUDto(this);}
}
