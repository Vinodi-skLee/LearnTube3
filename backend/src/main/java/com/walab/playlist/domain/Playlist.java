package com.walab.playlist.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.walab.common.BaseEntity;
import com.walab.content.domain.Content;
import com.walab.playlist.application.dto.MyPlaylistDto;
import com.walab.playlist.application.dto.PlaylistCUDto;
import com.walab.playlist.application.dto.PlaylistUDto;
import com.walab.playlist.application.dto.PlaylistNameDto;
import com.walab.user.domain.User;
import com.walab.video.domain.Video;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Entity
@Getter
@Setter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE playlist SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
public class Playlist extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "playlist")
    private List<Content> contents = new ArrayList<>();

    private String playlistName;

    private String description;

    private String thumbnailld;

    private Float totalDuration;

    private LocalDateTime createdAt;
    @PrePersist
    public void createdAt(){
        this.createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "playlist")
    private List<Video> videos = new ArrayList<>();

    public Playlist(PlaylistCUDto playlistCUDto) {
        this.playlistName = playlistCUDto.getPlaylistName();
        this.description = playlistCUDto.getDescription();
    }

    public Playlist(User user, PlaylistCUDto playlistCUDto) {
        this(playlistCUDto);
        this.user = user;
    }

    public MyPlaylistDto myPlaylistDto(){
        return new MyPlaylistDto(this.id, this.playlistName, this.description, this.user.getName(), this.thumbnailld, this.createdAt, this.totalDuration, this.videos);
    }

    public MyPlaylistDto toCreateResponseDto(){
        return MyPlaylistDto.builder()
                .playlistId(this.id)
                .name(this.playlistName)
                .description(this.description)
                .userName(this.user.getName())
                .totalDuration(this.totalDuration)
                .createdAt(this.createdAt)
                .build();
    }

    public void update(PlaylistUDto playlistCUDto) {
        this.playlistName = playlistCUDto.getPlaylistName();
        this.description = playlistCUDto.getDescription();
    }

    public PlaylistNameDto playlistNameDto(){
        return new PlaylistNameDto(this.id, this.playlistName);
    }


}
