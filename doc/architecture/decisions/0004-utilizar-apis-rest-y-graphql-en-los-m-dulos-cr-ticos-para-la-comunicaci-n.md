# 4. Utilizar APIs REST y GraphQL en los módulos críticos para la comunicación

**Fecha**: 2024-09-30

## Estado

Aceptado

## Contexto

El sistema está diseñado con una arquitectura basada en microservicios y microfrontends, lo que requiere una comunicación eficiente y flexible entre los servicios y las interfaces de usuario. Consideraciones clave incluyen:

- La necesidad de manejar módulos críticos con consultas complejas y respuestas rápidas.
- La capacidad de evitar sobrecargas de datos solicitando solo la información necesaria.
- Mejorar el rendimiento general y la experiencia del usuario.
- Facilitar la interoperabilidad con sistemas externos.

## Decisión

Se ha decidido utilizar una combinación de APIs REST y GraphQL para la comunicación en los módulos críticos del sistema. Las razones incluyen:

- REST es un estándar ampliamente adoptado que facilita la integración con otros sistemas.
- GraphQL permite que los clientes soliciten solo los datos que necesitan, optimizando el rendimiento en consultas personalizadas.
- REST será utilizado en módulos donde la integración simple y confiable sea suficiente.
- GraphQL se implementará en módulos críticos que requieran consultas en tiempo real o con un alto grado de personalización.

## Consecuencias

**Positivas**:

- REST facilita la interoperabilidad con otros sistemas mediante una integración estándar.
- GraphQL ofrece mayor flexibilidad al reducir la sobrecarga de datos solicitados, mejorando el rendimiento en módulos críticos.
- Optimización del tiempo de respuesta y mejor experiencia de usuario en consultas complejas o en tiempo real.

**Negativas**:

- Requiere que el equipo de desarrollo maneje ambas tecnologías, lo que puede aumentar la complejidad y la curva de aprendizaje.
- La combinación de dos enfoques puede implicar una mayor complejidad en la gestión y mantenimiento de las APIs.

## Cumplimiento

Se verificará que la implementación de los módulos críticos del sistema use principalmente APIs REST y GraphQL, asegurando la eficiencia, modularidad y escalabilidad necesarias para mejorar el rendimiento y la experiencia del usuario.
