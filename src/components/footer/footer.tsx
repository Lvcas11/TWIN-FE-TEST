import logo from '../../assets/logo.png';
/**
 * Props for the Footer component.
 */
interface FooterProps {
  columns: FooterColumn[];
}

/**
 * Defines the structure for each footer column.
 */
interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

/**
 * Defines the structure for each footer link.
 */
interface FooterLink {
  id: string;
  label: string;
  link: string;
}

const Footer = ({ columns }: FooterProps) => {
  return (
    <footer className="bg-gray-400 dark:bg-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-6 py-4 border-b border-gray-500">
        <div className="flex items-center justify-center lg:justify-start">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>
        {columns.map((column) => (
          <div key={column.id} className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {column.title}
            </h3>
            <ul className="space-y-1">
              {column.links.map((columnLink) => {
                const { id, link, label } = columnLink;

                return (
                  <li key={id}>
                    <a
                      href={link}
                      className="hover:underline text-gray-500 dark:text-gray-300"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 flex justify-center items-center h-10">
        <p className="text-gray-500 dark:text-gray-300">
          @2025 TWIN Foundation All Rights Reservered
        </p>
      </div>
    </footer>
  );
};

export default Footer;
