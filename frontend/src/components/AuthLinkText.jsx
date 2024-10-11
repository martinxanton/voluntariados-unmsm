
const AuthLinkText = ({ href, text, className }) => {
    return (
      <a href={href} className={`text-blue-600 hover:underline font-semibold ${className}`}>
        {text}
      </a>
    );
  };

export default AuthLinkText;