/*
  # Configuration initiale de la base de données e-commerce

  1. Nouvelles Tables
    - `orders`
      - `id` (uuid, clé primaire)
      - `user_id` (uuid, référence à auth.users)
      - `status` (enum)
      - `total` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, clé primaire)
      - `order_id` (uuid, référence à orders)
      - `quantity` (integer)
      - `price` (decimal)
      - `created_at` (timestamp)

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour permettre aux utilisateurs de voir uniquement leurs propres commandes
*/

-- Création du type enum pour le statut des commandes
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    status order_status DEFAULT 'pending',
    total decimal(10,2) NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des éléments de commande
CREATE TABLE IF NOT EXISTS order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders ON DELETE CASCADE,
    quantity integer NOT NULL CHECK (quantity > 0),
    price decimal(10,2) NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Activation de la sécurité niveau ligne
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité pour les commandes
CREATE POLICY "Users can view their own orders"
    ON orders
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
    ON orders
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Politiques de sécurité pour les éléments de commande
CREATE POLICY "Users can view their own order items"
    ON order_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own order items"
    ON order_items
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );