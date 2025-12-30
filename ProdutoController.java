package com.paola.loja.controller;
import com.paola.loja.model.Produto;
import com.paola.loja.repository.ProdutoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {
  private final ProdutoRepository repo;
  public ProdutoController(ProdutoRepository repo) { this.repo = repo; }
  @GetMapping
  public List<Produto> listar() { return repo.findAll(); }
  @PostMapping
  public Produto salvar(@RequestBody Produto p) { return repo.save(p); }
}
