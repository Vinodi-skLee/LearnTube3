package com.walab.content.application.dto;

import java.time.LocalDateTime;

import com.walab.content.presentation.response.ContentResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentDto {

    private Long contentId;
    private String contentName;
    private String contentDescription;
    private LocalDateTime openDate;
    private LocalDateTime closeDate;
    private Long playlistId;

    private Float playlistDuration;


    public ContentResponse contentResponse() {
        return new ContentResponse(contentId, contentName, contentDescription, openDate, closeDate, playlistId, playlistDuration);
    }
}
