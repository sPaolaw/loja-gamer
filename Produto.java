package com.paola.loja.model;
import jakarta.persistence.*;
import lombok.*;
@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Produto {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nome;
  private String descricao;
  private Double preco;
  private String imagem;
}
