package com.healthfriend.healthfriend.model.DTO.Exercise;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseSelectResponseDto {
  String type;
  String startTime;
  String endTime;
  String timeGap;
}
