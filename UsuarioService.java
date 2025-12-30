package com.paola.loja.service;
import com.paola.loja.model.Usuario;
import com.paola.loja.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UsuarioService {
  private final UsuarioRepository repo;
  public UsuarioService(UsuarioRepository repo) { this.repo = repo; }
  public Usuario cadastrar(Usuario u) { return repo.save(u); }
  public Usuario login(String email, String senha) {
    return repo.findByEmail(email).filter(u -> u.getSenha().equals(senha)).orElse(null);
  }
  public List<Usuario> listar() { return repo.findAll(); }
}
