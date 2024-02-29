import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {manageReservationActions} from "../../../redux/slices/manageReservation.slice";
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Box,
    Stepper,
    Step,
    StepLabel,
    Stack,
} from "@mui/material";
import {
    StyledButton,
    StyledButtonContainer,
    StyledCard,
    StyleGirdItem,
    StyledTypographyTitle,
    StyledTypographyValue,
    StyleGirdContainerData,
    StyleGirdCard,
    HeaderContainer,
    StyledItemService,
    StyleButtonInvoice,
    StyledGridCode
} from './StyledManageHotelDetail';
const steps = [
    'Pending',
    'Approved',
    'Progressing',
    'Completed',
];
const ManageReservationDetail = () => {
    const dispatch = useDispatch();
    const {reservation_id} = useParams();
    const reservationState = useSelector((state: RootState) => state.manageReservation.reservation);

    useEffect(() => {
        dispatch({
            type: `${manageReservationActions.getReservationPending}_saga`,
            payload: reservation_id,
        });
    }, [reservation_id])

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <HeaderContainer>
                <StyledButtonContainer>
                    <StyledButton variant="contained" color="warning">
                        Approve
                    </StyledButton>
                    <StyledButton variant="contained" color="success">
                        Check In
                    </StyledButton>
                    <StyledButton variant="contained" color="primary">
                        Check Out
                    </StyledButton>
                </StyledButtonContainer>

                <StyleButtonInvoice variant="outlined" href="" style={{position: 'absolute', right: 0}}>
                    Invoice
                </StyleButtonInvoice>
            </HeaderContainer>
            <StyledGridCode item xs={12} sm={6}>
                <Typography variant="h5" gutterBottom>
                    Code: {reservationState.code}
                </Typography>
            </StyledGridCode>

            <StyleGirdCard>
                <StyledCard>
                    <StyleGirdItem item xs={12} sm={6}>
                        <Card>
                            <CardHeader title="Customer"/>
                            <CardContent>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Name:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.name}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Phone:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.phone}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Email:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.email}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Address:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.address}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Age:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.age}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Identification:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.user?.identification}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                            </CardContent>
                        </Card>
                    </StyleGirdItem>
                    <StyleGirdItem item xs={12} sm={6}>
                        <Card sx={{marginTop: 2}}>
                            <CardHeader title="Service"/>
                            <CardContent>
                                <Stack direction="row" spacing={4}>
                                    <StyledItemService>Service 1</StyledItemService>
                                    <StyledItemService>Service 2</StyledItemService>
                                    <StyledItemService>Service 3</StyledItemService>
                                </Stack>

                            </CardContent>
                        </Card>
                    </StyleGirdItem>
                </StyledCard>
                <StyledCard>
                    <StyleGirdItem item xs={12} sm={6}>
                        <Card>
                            <CardHeader title="Information"/>
                            <CardContent>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Hotel:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.hotel?.name}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Room Type:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.room_type?.name}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Room Code:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.room?.code}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                {reservationState.status === 'rejected' &&
                                    <StyleGirdContainerData container>
                                        <Grid item xs={4}>
                                            <StyledTypographyTitle gutterBottom>
                                                Reject Reason:
                                            </StyledTypographyTitle>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <StyledTypographyValue gutterBottom>
                                                {reservationState.reject_reason}
                                            </StyledTypographyValue>
                                        </Grid>

                                    </StyleGirdContainerData>
                                }
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Start Date:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.start_date}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            End Date:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.end_date}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Check in:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.check_in}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Check out:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.check_out}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>
                                <StyleGirdContainerData container>
                                    <Grid item xs={4}>
                                        <StyledTypographyTitle gutterBottom>
                                            Amount Person:
                                        </StyledTypographyTitle>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <StyledTypographyValue gutterBottom>
                                            {reservationState.amount_person}
                                        </StyledTypographyValue>
                                    </Grid>

                                </StyleGirdContainerData>

                            </CardContent>
                        </Card>
                    </StyleGirdItem>
                </StyledCard>

            </StyleGirdCard>
        </>
    )
};

export default ManageReservationDetail;