import styles from './footer.module.scss';

export const Footer = () => {
  return (
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Gr-Olga. Contributions are welcome!
          <a
              href="https://github.com/gr-olga"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
          >
            <p> View on GitHub</p>
          </a>
        </p>
      </footer>
  );
};