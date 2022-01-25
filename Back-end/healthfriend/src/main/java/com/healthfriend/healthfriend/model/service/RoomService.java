package com.healthfriend.healthfriend.model.service;

import java.util.List;

import com.healthfriend.healthfriend.model.DTO.Room.RoomDetailResponseDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomModifyRequestDto;
import com.healthfriend.healthfriend.model.DTO.Room.RoomResponseDto;

public interface RoomService {
  public boolean addRoom(RoomDto room) throws Exception;

  public List<RoomResponseDto> findRoom() throws Exception;

  public List<RoomResponseDto> findRoom(String title) throws Exception;

  public boolean modifyRoom(RoomModifyRequestDto roomModifyRequestDto) throws Exception;

  public RoomDetailResponseDto findRoom(int id) throws Exception;

  public boolean removeRoom(int id) throws Exception;
}
