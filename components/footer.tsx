export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border px-6 py-12">
      <p className="text-center text-sm tracking-wide text-muted-foreground">
        &copy; {year}
      </p>
    </footer>
  )
}
