interface restaurantProps {
  restaurant: string;
}

const About = ({ restaurant }: restaurantProps) => {
  return (
    <div className="mt-6 space-y-4 px-5 text-xs text-muted-foreground">
      {restaurant} O SushiDojo é uma joia gastronômica que transporta seus
      clientes para o coração do Japão, com sua atmosfera serena, design
      minimalista e um balcão de sushi onde mestres habilidosos preparam pratos
      autênticos com ingredientes frescos e selecionados, garantindo uma
      experiência culinária excepcional e memorável.
    </div>
  );
};

export default About;
