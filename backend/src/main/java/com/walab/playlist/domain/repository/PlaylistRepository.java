package com.walab.playlist.domain.repository;

import com.walab.playlist.domain.Playlist;

import com.walab.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    @Query("select p from Playlist p " +
            "left join fetch p.videos as v " +
            "where p.id = :id")
    Playlist findPlaylistById(@Param("id")Long Id);

    @Query("select p from Playlist p " +
            "where p.user.id = :userId ")
    List<Playlist> getPlaylistNameByUserId(Long userId);

    List<Playlist> findPlaylistByUserIdAndPlaylistNameContainsIgnoreCase(@Param("userId") Long userId, @Param("playlistName") String playlistName);
}
