function highlightInvalid({ currentTarget: { elements }}: React.FormEvent<HTMLFormElement>) {
  const hasInvalid = Array
    .from(elements)
    .filter((element): element is HTMLInputElement => element instanceof HTMLInputElement && !element.validity.valid);
  
  if(hasInvalid.length) {
    hasInvalid.forEach((invalid) => invalid.focus())
    return true
  }

  return false
}

export default function Form({
  children,
  onSubmit,
  className,
}: {
  onSubmit: Function;
  children: React.ReactNode;
  className: string
}) {
  return (
    <>
      <form 
        className={className}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const hasInvalid = highlightInvalid(e);
          if(hasInvalid) return;
          onSubmit();
      }}>
        {children}
      </form>
    </>
  )
}
