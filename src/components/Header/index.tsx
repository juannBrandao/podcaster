import format from  'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import  styles from"./styles.module.scss";

export default function Header() {
  const currentDate = format(new Date(),'EEEEEE,d MMM',{
    locale:ptBR
  });
  return (
    <header className={styles.headercontainer}>
      <img src="/logo.svg" alt="podcastr" />
      <p> O melhor para ouvir sempre.</p>
      <span>{currentDate}</span>
    </header>
  );
}
