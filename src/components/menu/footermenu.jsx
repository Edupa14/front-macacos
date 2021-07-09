import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './menu.css'

const FooterMenu = () => {
    return (
        <section className="mt-4 pt-5">      
        <Container fluid className="footer-ac fixed-bottom py-3 spacing-title text-gillsans-light">
            <Row >
                <Col xs={12} md={2} className="text-center py-2 item-footer">
                    <small className="my-2 px-0">AC Factoring &#169; </small>
                </Col>
                <Col xs={12} md={8} className="text-center py-2 item-footer ">
                    <small className="my-2 px-0">Benjamin Franklin, "Invertir en conocimientos produce siempre los mejores beneficios"</small>

                </Col>
                <Col xs={12} md={2} className="text-center py-2">
                    <small className="my-2 px-0">Platform By Hackmonkeys</small>
                </Col>
            </Row>
        </Container>
        </section>
    );
}

export default FooterMenu;