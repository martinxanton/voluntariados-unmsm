# 2. Usar microservicios como arquitectura de referencia

**Fecha**: 2024-09-30

## Estado

Aceptado

## Contexto

La principal preocupación es establecer una estructura general para el sistema, con las siguientes consideraciones:

- Se espera un crecimiento significativo en términos de usuarios y funcionalidades.
- El sistema debe ser altamente escalable, permitir el despliegue rápido de nuevas características, y ser resiliente ante fallos.
- El equipo necesita libertad para utilizar diferentes tecnologías y lenguajes de programación en distintas partes del sistema.
- Se han evaluado varias tendencias de arquitectura del reporte de InfoQ, incluyendo Microservicios, Serverless y Monolito modular.

## Decisión

Se ha decidido adoptar una arquitectura basada en microservicios como el enfoque principal para el desarrollo del sistema, debido a:

- Permitir escalar partes específicas del sistema que experimenten alta demanda.
- Facilitar que los equipos de desarrollo trabajen en servicios individuales de manera aislada, permitiendo despliegues independientes.
- Ser una arquitectura cloud-native, lo que facilita la gestión de infraestructura y despliegue en la nube.

## Consecuencias

**Positivas**:

- Mayor escalabilidad.
- Mayor agilidad en el desarrollo y despliegue.
- Resiliencia ante fallos.
- Flexibilidad tecnológica al permitir diferentes lenguajes y tecnologías en distintos servicios.

**Negativas**:

- Aumento en la complejidad de la gestión y orquestación de múltiples microservicios.

## Cumplimiento

Se verificará que el diseño del sistema adopte la arquitectura de microservicios, así como su desarrollo posterior.

