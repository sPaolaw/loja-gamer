package com.paola.loja.controller;
import com.paola.loja.model.Usuario;
import com.paola.loja.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
  private final UsuarioService service;
  public UsuarioController(UsuarioService service) { this.service = service; }
  @PostMapping("/cadastro")
  public Usuario cadastrar(@RequestBody Usuario u) { return service.cadastrar(u); }
  @PostMapping("/login")
  public Usuario login(@RequestBody Usuario u) { return service.login(u.getEmail(), u.getSenha()); }
  @GetMapping
  public List<Usuario> listar() { return service.listar(); }
}
