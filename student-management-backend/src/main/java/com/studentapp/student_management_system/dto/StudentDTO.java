package com.studentapp.student_management_system.dto;


import lombok.Data;


@Data
public class StudentDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String course;
}