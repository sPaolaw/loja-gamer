package com.paola.loja.model;
import jakarta.persistence.*;
import lombok.*;
@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Usuario {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nome;
  private String email;
  private String senha;
  private String genero; // 'M', 'F' ou 'N'
}
