package com.paola.loja;
import com.paola.loja.model.Produto;
import com.paola.loja.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class DataLoader {
  @Bean
  CommandLineRunner load(ProdutoRepository repo) {
    return args -> {
      if (repo.count() == 0) {
        repo.save(new Produto(null,"Mouse Gamer RGB","Mouse ergonômico com 7 botões e luz RGB.",199.90,"https://images.unsplash.com/photo-1616628182504-0391a4c63b7f"));
        repo.save(new Produto(null,"Teclado Mecânico RGB","Switches azuis e retroiluminação.",349.90,"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"));
        repo.save(new Produto(null,"Headset Surround","Som 7.1 com microfone ajustável.",299.90,"https://images.unsplash.com/photo-1546435770-a3e426bf472b"));
        repo.save(new Produto(null,"Headset Gatinho RGB","Com orelhas e iluminação rosa.",259.90,"https://images.unsplash.com/photo-1604464600750-56b8b3d5a3b5"));
        repo.save(new Produto(null,"Monitor Curvo 144Hz","Tela 24\" Full HD 144Hz.",1299.90,"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200"));
        repo.save(new Produto(null,"Cadeira Gamer RGB","Ergonômica e reclinável.",999.90,"https://images.unsplash.com/photo-1598300183876-3b7d2a4a3b4b"));
        repo.save(new Produto(null,"Microfone USB RGB","Perfeito para streams.",349.90,"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"));
        repo.save(new Produto(null,"Controle RGB","Compatível com PC e console.",249.90,"https://images.unsplash.com/photo-1606811767369-1e3cb6f25a4b"));
        repo.save(new Produto(null,"Caixa de Som Gamer","Som estéreo potente.",399.90,"https://images.unsplash.com/photo-1616627761340-4365a7af1b22"));
      }
    };
  }
}
