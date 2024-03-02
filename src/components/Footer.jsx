// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Sobre</FooterTitle>
          <FooterList>
            <FooterListItem>Termos de Uso</FooterListItem>
            <FooterListItem>Política de Privacidade</FooterListItem>
            <FooterListItem>Preferências de Cookies</FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Ajuda</FooterTitle>
          <FooterList>
            <FooterListItem>FAQ</FooterListItem>
            <FooterListItem>Central de Ajuda</FooterListItem>
            <FooterListItem>Contatos</FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Redes Sociais</FooterTitle>
          <SocialIcons>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialIconLink>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <FooterDisclaimer>
        Este é um projeto fictício desenvolvido com fins educacionais. Todos os direitos reservados.
      </FooterDisclaimer>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #0f1218;
  color: #8e9297;
  padding: 40px 0;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  flex: 1;
`;

const FooterTitle = styled.h4`
  font-size: 20px;
  margin-bottom: 20px;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
`;

const SocialIconLink = styled.a`
  color: #8e9297;
  font-size: 24px;
  margin-right: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const FooterDisclaimer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
`;

export default Footer;