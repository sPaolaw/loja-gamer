package com.paola.loja.repository;
import com.paola.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProdutoRepository extends JpaRepository<Produto, Long> {}
