# Scroll Blur Wrapper

É um componente feito em React com TypeScript, ele é muito leve e é totalmente executado no lado do cliente, ele aplica um efeito de desfoque de movimento dinâmico aos seus filhos com base na velocidade de rolagem do usuário

## Como usar

```tsx
import { ScrollBlurWrapper } from "./scroll-blur-wrapper";

export default function exemplo() {
  return (
    <ScrollBlurWrapper minvelocity={30} blurdirection="vertical">
      <div className="minha-secção">
        teu conteúdo
      </div>
    </scrollblurwrapper>
  );
}
```

## Props

| propriedade     | tipo                             | padrão       | descrição                                |
| --------------- | ---------------------------------| ------------ | ---------------------------------------- |
| `children`      | react.reactnode                  | obrigatório  | elementos a serem envolvidos             |
| `className`     | string                           | opcional     | classes tailwinds (caso uses)            |
| `style`         | react.cssproperties              | opcional     | estilos inline                           |
| `minVelocity`   | número (0–100)                   | `20`         | velocidade mínima para ativar o desfoque |
| `blurDirection` | `"vertical"` ou `"horizontal"`   | `"vertical"` | orientação do desfoque                   |

## ❤️ Apoia este projeto

<a href="https://www.paypal.com/donate/?hosted_button_id=RA8KH3JFCKXCS">Clica aqui para apoiar</a>

### ⭐ **Deixa uma estrela no repositório**

Uma simples estrela ajuda bué o projeto a crescer e alcançar mais desenvolvedores.

By: Freddy Danilo



