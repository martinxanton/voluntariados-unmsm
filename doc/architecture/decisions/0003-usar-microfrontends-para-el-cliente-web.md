# 3. Usar microfrontends como patrón para el cliente web

**Fecha**: 2024-09-30

## Estado

Aceptado

## Contexto

El sistema requiere una solución modular para la interfaz de usuario que permita una evolución rápida y escalable. Las principales consideraciones incluyen:

- La necesidad de actualizar componentes sin afectar toda la aplicación.
- La capacidad de escalar el sistema conforme crezca el número de usuarios y funcionalidades.
- Asegurar una buena usabilidad y tiempos de respuesta eficientes.
- Complementar el enfoque de microservicios en la arquitectura general del sistema.

## Decisión

Se ha decidido adoptar el patrón de Microfrontends para el desarrollo del cliente web por las siguientes razones:

- Facilitan el desarrollo modular y colaborativo entre equipos independientes.
- Permiten actualizar partes de la aplicación de forma aislada, sin interrumpir el resto.
- Mejoran la escalabilidad y resiliencia del sistema, permitiendo que cada parte de la interfaz crezca y se recupere de fallos de manera autónoma.

## Consecuencias

**Positivas**:

- Desarrollo ágil y modular.
- Mayor flexibilidad para actualizaciones y mejoras.
- Mejor escalabilidad y resistencia ante fallos.

**Negativas**:

- Mayor complejidad en la gestión de los distintos módulos de la interfaz.

## Cumplimiento

Se verificará que el diseño y desarrollo del cliente web adopte el patrón de Microfrontends, garantizando la modularidad y escalabilidad deseadas.

