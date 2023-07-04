import { Form, Modal, message } from "antd";
import React from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }
      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        title={formType === "add" ? "ADD THEATRE" : "EDIT THEATRE"}
        open={showTheatreFormModal}
        onCancel={() => {
          setShowTheatreFormModal(false);
          setSelectedTheatre(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedTheatre}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter theatre name" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter theatre address" },
            ]}
          >
            <textarea type="text" />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number " }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <input type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <Button
              title="Cancel"
              type="button"
              variant="outlined"
              onClick={() => {
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
              }}
            />
            <Button title="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default TheatreForm;
