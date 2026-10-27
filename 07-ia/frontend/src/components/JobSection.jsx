import snarkdown from "snarkdown"
import styles from "../pages/Detail.module.css"

export function JobSection({ title, content }) {
  const html = snarkdown(content)
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}
