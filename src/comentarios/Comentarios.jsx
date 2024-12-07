import React, { useState, useEffect } from "react";
import {
    Container,
    Title,
    ReviewsContainer,
    ReviewsTable,
    TableRow,
    TableHeader,
    TableCell
} from "./Comentarios-style";
import { useAuth } from "../contexts/AuthContext";
import { useToken } from "../contexts/TokenContext";
import { useTenant } from "../contexts/TenantContext";

const Comentarios = () => {
    const { tenantID } = useTenant();
    const { userID } = useAuth();
    const { token } = useToken();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await fetch(
                `https://35l07upneb.execute-api.us-east-1.amazonaws.com/prod/review/list?tenant_id=${tenantID}&user_id=${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }
            const result = await response.json();
            const parsedBody =
            typeof result.body === "string" ? JSON.parse(result.body) : result.body;
            if (!parsedBody || !Array.isArray(parsedBody)) {
                throw new Error("Reviews not found");
            }
            setReviews(parsedBody);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [tenantID, userID, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container>
        <Title>Comentarios</Title>
        <ReviewsContainer>
        <ReviewsTable>
        <thead>
        <TableRow>
        <TableHeader>Comentario ID</TableHeader>
        <TableHeader>Producto</TableHeader>
        <TableHeader>Comentario</TableHeader>
        <TableHeader>Calificación</TableHeader>
        <TableHeader>Fecha</TableHeader>
        </TableRow>
        </thead>
        <tbody>
        {reviews.map((review) => (
            <TableRow key={review.comment_id}>
            <TableCell>{review.comment_id}</TableCell>
            <TableCell>{review.product_name || "N/A"}</TableCell>
            <TableCell>{review.comment_text || "N/A"}</TableCell>
            <TableCell>{review.rating || "N/A"}</TableCell>
            <TableCell>{review.date || "N/A"}</TableCell>
            </TableRow>
        ))}
        </tbody>
        </ReviewsTable>
        </ReviewsContainer>
        </Container>
    );
};

export default Comentarios;
