Feature: Calculator
    As a user
    I want to create a order
    So that i can receive my food to eat
 
 Scenario: Create Order
    When I send a POST request to "/order" with the following details with a random product ID:
      | clientCpf   | 29529422019       |
      | value       | 80.00             |
      | productsIds | #{productId}      |
    Then the response should have status 201
    And should return a unique order ID
    And the order should be registered with the following details:
      | clientId    | value     | status          |
      | 51234       | 80.00     | received        |
