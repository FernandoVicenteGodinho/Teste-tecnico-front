import React, { ReactNode, useState } from 'react';
import 'tippy.js/dist/tippy.css';

interface CustomButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  ClassName?: string;
  ButtonType?:
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-danger'
  | 'btn-warning'
  | 'btn-success'
  | 'btn-info'
  | 'btn-gray'
  | 'btn-outline-primary'
  | 'btn-outline-secondary'
  | 'btn-outline-danger'
  | 'btn-outline-warning'
  | 'btn-outline-success'
  | 'btn-outline-info'
  | 'btn-outline-gray';
  disabled?: boolean;
  isSave?: boolean;
}
/**
 * CustomButton - Componente de botão personalizável com suporte a diferentes tipos e estilos
 *
 * Esse componente exibe um botão com diversas opções de personalização.
 *
 * @param {CustomButtonProps} props - Propriedades de personalização do componente
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] - Função chamada ao clicar no botão
 * @param {ReactNode} props.children - Conteúdo a ser exibido dentro do botão
 * @param {"button" | "submit" | "reset"} [props.type='button'] - Tipo do botão
 * @param {React.CSSProperties} [props.style] - Estilos CSS adicionais
 * @param {string} [props.ClassName] - Classe CSS adicional para o botão
 * @param { "btn-primary"
 *          | "btn-secondary"
 *          | "btn-danger"
 *          | "btn-warning"
 *          | "btn-success"
 *          | "btn-info"
 *          | "btn-gray"
 *          | "btn-outline-primary"
 *          | "btn-outline-secondary"
 *          | "btn-outline-danger"
 *          | "btn-outline-warning"
 *          | "btn-outline-success"
 *          | "btn-outline-info"
 *          | "btn-outline-gray"
 *        } [props.ButtonType='primary'] - Tipo do botão para estilização
 * @param {boolean} [props.disabled=false] - Define se o botão está desativado
 * @param {boolean} [props.isSave=false] - Define indicador de save *
 * @example
 * <CustomButton
 *   onClick={() => console.log('Botão clicado')}
 *   ButtonType="success"
 * >
 *   Clique aqui
 * </CustomButton>
 */
const CustomButton = ({
  onClick,
  children,
  type = 'button',
  style,
  ClassName,
  ButtonType = 'btn-primary',
  disabled = false,
  isSave = false,
}: CustomButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSpinnerColor = () => {
    if (isHovered) {
      return "border-white";
    }
    switch (ButtonType) {
      case 'btn-outline-primary':
        return 'border-primary';
      case 'btn-outline-secondary':
        return 'border-secondary';
      case 'btn-outline-danger':
        return 'border-danger';
      case 'btn-outline-warning':
        return 'border-warning';
      case 'btn-outline-success':
        return 'border-success';
      case 'btn-outline-info':
        return 'border-info';
      case 'btn-outline-gray':
        return 'border-gray';
      default:
        return 'border-white';
    }
  };
  return (
      <button
        type={type}
        onClick={onClick}
        style={style}
        className={`button btn ${ButtonType} ${ClassName}`}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isSave && (
          <span
            className={`animate-spin border-2 ${getSpinnerColor()} border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle`}
          ></span>
        )}
        {children}
      </button>
  );
};

export default CustomButton;